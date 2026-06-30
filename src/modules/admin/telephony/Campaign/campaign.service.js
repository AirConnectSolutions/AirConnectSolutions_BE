import Campaign from "./campaign.model.js";
import AppError from "../../../../../utils/AppError.js"

//createService
export const createCampaignService = async (campaignData) => {
  return await Campaign.create(campaignData);
};

//getAllService
export const getAllCampaignsService = async () => {
  return await Campaign.find().sort({ createdAt: -1 });
};

//findByidService
export const getCampaignByIdService = async (id) => {
  const campaign = await Campaign.findById(id);
  if (!campaign) {
    throw new AppError("Campaign not found", 404);
  }
  return campaign;
};

//updateService
export const updateCampaignService = async (id, updateData) => {
  const updatedCampaign = await Campaign.findByIdAndUpdate(id, updateData, {

    runValidators: true,
  });
  if (!updatedCampaign) {
    throw new AppError("Campaign not found to update", 404);
  }
  return updatedCampaign;
};

//deleteService
export const deleteCampaignService = async (id) => {
  const campaign = await Campaign.findByIdAndDelete(id);
  if (!campaign) {
    throw new AppError("Campaign not found to delete", 404);
  }
  return campaign;
};