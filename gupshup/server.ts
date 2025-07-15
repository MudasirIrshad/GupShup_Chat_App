import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import prisma from "./lib/prisma";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    cors: {
      origin: `http://${hostname}:${port}`,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("chat message", async (data) => {
      try {
        // Validate required fields
        if (!data.content || !data.senderId || !data.receiverId) {
          throw new Error("Missing required fields");
        }

        console.log(
          data.content,
          `This is senderId: ${data.senderId}`,
          `THis is receiver Id: ${data.receiverId}`
        );

        // Verify users exist
        const usersExist = await prisma.user.findMany({
          where: {
            id: { in: [data.senderId, data.receiverId] },
          },
          select: { id: true },
        });

        if (usersExist.length !== 2) {
          throw new Error("Sender or receiver not found");
        }

        const receiverGmail = await prisma.user.findUnique({
          where: {
            id: data.receiverId,
          },
        });

        const receiverIdInMycontacts = await prisma.myContacts.findUnique({
          where: {
            ownerId_contactGmail: {
              ownerId: data.senderId,
              contactGmail: receiverGmail?.email!,
            },
          },
        });

        // // Create message
        const message = await prisma.chat.create({
          data: {
            content: data.content,
            senderId: data.senderId,
            receiverId: data.receiverId,
            direction: "OUTGOING",
            seen: false,
          },
          include: {
            sender: {
              select: {
                id: true,
                name: true,
              },
            },
            receiver: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });

        // Broadcast to specific room (receiverId) instead of all clients
        io.to(data.receiverId).emit("new message", message);
        io.to(data.senderId).emit("new message", message);
        socket.emit("message sent", message);
      } catch (error) {
        console.error("Error:", error);
        socket.emit("error", {
          message: "Failed to send message",
          details: error,
        });
      }
    });

    // Join user to their own room for private messaging
    socket.on("join user", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their room`);
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
