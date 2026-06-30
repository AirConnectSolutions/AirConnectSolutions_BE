import Server from "./server.model.js";
import AppError from "../../../../../utils/AppError.js";

//newServer
export const createServerService = async (serverData) => {
  return await Server.create(serverData)
}

//getAllServer
export const getAllServersService = async () => {
  return await Server.find();
};

//getById
export const getServerByIdService = async (id) => {
  const server = await Server.findById(id);
  if (!server) {
    throw new AppError("Server configuration not found", 404);
  }
  return server;
};


//updateById
export const updateServerService = async (id, updateData) => {
  const updatedServer = await Server.findByIdAndUpdate(id, updateData, {
    runValidators: true,
  });
  if (!updatedServer) {
    throw new AppError("Server not found to update", 404);
  }
  return updatedServer;
};


//deleteById
export const deleteServerService = async (id) => {
  const server = await Server.findByIdAndDelete(id);
  if (!server) {
    throw new AppError("Server not found to delete", 404);
  }
  return server;
};