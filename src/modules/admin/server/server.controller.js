import {
  createServerService,
  getAllServersService,
  getServerByIdService,
  updateServerService,
  deleteServerService
} from "./server.service.js"

export const createServer = async (req, res, next) => {
  try {
    const newServer = await createServerService(req.body)
    res.status(201).json({
      success: true,
      message: "Server Added successfully",
      data: newServer
    })
  } catch (error) {
    next(error)
  }
}


// 2. READ ALL
export const getAllServers = async (req, res, next) => {
  try {
    const servers = await getAllServersService();
    res.status(200).json({
      success: true,
      count: servers.length,
      data: servers,
    });
  } catch (error) {
    next(error);
  }
};


// 3. READ SINGLE
export const getServerById = async (req, res, next) => {
  try {
    const server = await getServerByIdService(req.params.id);
    res.status(200).json({
      success: true,
      data: server,
    });
  } catch (error) {
    next(error);
  }
};


// 4. UPDATE
export const updateServer = async (req, res, next) => {
  try {
    const updatedServer = await updateServerService(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Server updated successfully",
      data: updatedServer,
    });
  } catch (error) {
    next(error);
  }
};


// 5. DELETE
export const deleteServer = async (req, res, next) => {
  try {
    await deleteServerService(req.params.id);
    res.status(200).json({
      success: true,
      message: "Server configuration deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};