import {
  createCampaignService,
  getAllCampaignsService,
  getCampaignByIdService,
  updateCampaignService,
  deleteCampaignService
} from "./campaign.service.js";

//Create Campaign
export const createCampaign = async (req, res, next) => {
  try {
    const campaign = await createCampaignService(req.body);
    res.status(201).json({
      success: true,
      message: "Campaign created successfully",
      data: campaign,
    });
  } catch (error) {
    next(error);
  }
};

//Get All Campaigns
export const getAllCampaigns = async (req, res, next) => {
  try {
    const campaigns = await getAllCampaignsService();
    res.status(200).json({
      success: true,
      results: campaigns.length,
      data: campaigns,
    });
  } catch (error) {
    next(error);
  }
};

//Get Single Campaign By ID
export const getCampaignById = async (req, res, next) => {
  try {
    const campaign = await getCampaignByIdService(req.params.id);
    res.status(200).json({
      success: true,
      data: campaign,
    });
  } catch (error) {
    next(error);
  }
};

//Update Campaign
export const updateCampaign = async (req, res, next) => {
  try {
    const updatedCampaign = await updateCampaignService(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Campaign updated successfully",
      data: updatedCampaign,
    });
  } catch (error) {
    next(error);
  }
};

//Delete Campaign
export const deleteCampaign = async (req, res, next) => {
  try {
    await deleteCampaignService(req.params.id);
    res.status(200).json({
      success: true,
      message: "Campaign deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};