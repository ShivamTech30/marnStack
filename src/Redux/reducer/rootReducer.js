import { combineReducers } from "redux";
import {
  productReducer,
  orderDetailsReducer,
  patchUserDetailsReducer,
  DeleteUserAddressReducer,
  ResetPasswordPatchReducer,
  PostPincodesAvailabilityReducer,
  PostPincodesDeliveredReducer,
  PostPickupAddressReducer,
  PatchPickupAddressReducer,
  PostDeliveryAddressReducer,
  GetShipmentDetailsReducer,
  PostShipmentDetailsReducer,
  GetAdminDashboardViewOrderReducer,
  PostAdminDashboardTransactionReducer,
  PostAdminDashboardShippingMatrixReducer,
  GetAdminOrderIntransitReducer,
  GetAdminOrderDeliveredReducer,
  GetAdminOrderPendingReducer,
  GetAdminOrderReturnReducer,
  GetAdminOrderSummaryReducer,
  GetAdminOrderBookedReducer,
  ToggleSideBarReducer,
  OrderPageBookNavigateReducer,
  OrderPageBoookNavigateReducer,
  PostAdminOrderFilterationReducer,
  GetAdminOrderCustomerReducer,
  PatchAdminOrderEditReducer,
  GetAdminOrderCallBuyerReducer,
  GetAdminOrderGenerateOrderIdReducer,
  GetAdminOrderPaymentOrderReducer,PostAdminOrderPaymentCalReducer, PostAdminOrderAddShipmentReducer,
  PostViewAdminOrderReducer, GetDeliveryPriceDetailReducer,
  GetAdminOrderCloneOrderReducer,
  PostAdminPendingOrderActionReducer,
  DeleteAdminPendingOrderActionReducer,
  PostAdminSettingAddEmployeeReducer,
  GetCategoryDetailsReducer,
  GetSettingViewPermissionReducer,
  GetSettingEmployeeInfoReducer,
  PostAdminSettingAddCategoryReducer,
  GetSettingUserInfoReducer,
  DeleteAdminSettingDeleteUserReducer,
  PatchEditUserPermissionReducer,
  GetSettingViewB2bFeedbackReducer,
  GetSettingViewB2bCloseFeedbackReducer,
  GetSettingViewB2cFeedbackReducer,
  GetSettingViewB2cCloseFeedbackReducer,
  DeleteSettingDismissTicketReducer,
  PatchEditCategoryDetailsReducer,
  DeleteCategoryDetailsReducer,
  GetAdminProfileReducer,
  PatchEditProfileReducer,
  PostAdminOrderCsvFileReducer,
  GetAdminCloneOrderReducer,
  PostOrderDownloadInvoiceFileReducer,
  GetOrderDownloadInvoiceReducer,
  DeleteAdminOrderReducer,
  PatchEditEmployeeReducer,
  GetBillingInvoiceDetailReducer,
  GetBillingAmountCountReducer,
  GetDashboardNotificationReducer,
  PostAddOrderTagReducer,
  PostUploadFileReducer,
  PostDashboardRevenueReducer,
  PostDashboardViewOrderReducer,
  GetCodRemittanceReducer,
  GetCodRemittanceBillingAmountReducer,
  GetB2bCompanyInfoReducer,
  PostUploadBillRemittanceFileReducer,
  GetWalletHistoryReducer,
  GetWalletBalanceReducer,
  PostWalletAddMoneyReducer,
  PostPincodeUploadFileReducer,
  PostDebitBalanceReducer,
  PostTrackingOrderDetailsReducer,
  PostCreateTicketReducer,
  PostTicketDetailReducer,
  DeleteSupportTicketReducer,
  PostBillingCodRemittanceCountReducer,
  PostBillingCodRemittanceDetailsReducer,
  HeaderToggleClassAddReducer,
  PostCreateFeedbackReducer,
  PatchTrackDetailsReducer,
  GetCustomerOrderDetailReducer,
  PostRaiseContactUSReducer,
  PostOrderTrackReducer,
  PostCompanyFileReducer,
  PostGetFeedbackReducer,
  PostKYCdetailReducer,
  PostClearNotificationReducer,
  GetUserNotificationReducer,
  ShipmentLoaderTrueFalseReducer,
  ToggleSideBarTrueFalseReducer,
  GetAuthDetailsReducer,
  GetPermissionReducer,
  GetGoogleCityStateReducer
 
} from "./Reducer";

const rootReducer = combineReducers({
  productReducer,
  orderDetailsReducer,
  patchUserDetailsReducer,
  DeleteUserAddressReducer,
  ResetPasswordPatchReducer,
  PostPincodesAvailabilityReducer,
  PostPincodesDeliveredReducer,
  PostPickupAddressReducer,
  PatchPickupAddressReducer,
  PostDeliveryAddressReducer,
  GetShipmentDetailsReducer,
  PostShipmentDetailsReducer,
  GetAdminDashboardViewOrderReducer,
  PostAdminDashboardTransactionReducer,
  PostAdminDashboardShippingMatrixReducer,
  GetAdminOrderIntransitReducer,
  GetAdminOrderDeliveredReducer,
  GetAdminOrderPendingReducer,
  GetAdminOrderReturnReducer,
  GetAdminOrderSummaryReducer,
  GetAdminOrderBookedReducer,
  ToggleSideBarReducer,
  OrderPageBookNavigateReducer,
  OrderPageBoookNavigateReducer,
  PostAdminOrderFilterationReducer,
  GetAdminOrderCustomerReducer,
  PatchAdminOrderEditReducer,
  GetAdminOrderCallBuyerReducer,
  GetAdminOrderGenerateOrderIdReducer,
  GetAdminOrderPaymentOrderReducer,
  PostAdminOrderPaymentCalReducer,
  PostAdminOrderAddShipmentReducer,
  PostViewAdminOrderReducer,
  GetDeliveryPriceDetailReducer,
  GetAdminOrderCloneOrderReducer,
  PostAdminPendingOrderActionReducer,
  DeleteAdminPendingOrderActionReducer,
  PostAdminSettingAddEmployeeReducer,
  GetCategoryDetailsReducer,
  GetSettingViewPermissionReducer,
  GetSettingEmployeeInfoReducer,
  PostAdminSettingAddCategoryReducer,
  GetSettingUserInfoReducer,
  DeleteAdminSettingDeleteUserReducer,
  PatchEditUserPermissionReducer,
  GetSettingViewB2bFeedbackReducer,
  GetSettingViewB2bCloseFeedbackReducer,
  GetSettingViewB2cFeedbackReducer,
  GetSettingViewB2cCloseFeedbackReducer,
  DeleteSettingDismissTicketReducer,
  PatchEditCategoryDetailsReducer,
  DeleteCategoryDetailsReducer,
  GetAdminProfileReducer,
  PatchEditProfileReducer,
  PostAdminOrderCsvFileReducer,
  GetAdminCloneOrderReducer,
  PostOrderDownloadInvoiceFileReducer,
  GetOrderDownloadInvoiceReducer,
  DeleteAdminOrderReducer,
  PatchEditEmployeeReducer,
  GetBillingInvoiceDetailReducer,
  GetBillingAmountCountReducer,
  GetDashboardNotificationReducer,
  PostAddOrderTagReducer,
  PostUploadFileReducer,
  PostDashboardRevenueReducer,
  PostDashboardViewOrderReducer,
  GetCodRemittanceReducer,
  GetCodRemittanceBillingAmountReducer,
  GetB2bCompanyInfoReducer,
  PostUploadBillRemittanceFileReducer,
  GetWalletHistoryReducer,
  GetWalletBalanceReducer,
  PostWalletAddMoneyReducer,
  PostPincodeUploadFileReducer,
  PostDebitBalanceReducer,
  PostTrackingOrderDetailsReducer,
  PostCreateTicketReducer,
  PostTicketDetailReducer,
  DeleteSupportTicketReducer,
  PostBillingCodRemittanceCountReducer,
  PostBillingCodRemittanceDetailsReducer,
  HeaderToggleClassAddReducer,
  PostCreateFeedbackReducer,
  PatchTrackDetailsReducer,
  GetCustomerOrderDetailReducer,
  PostRaiseContactUSReducer,
  PostOrderTrackReducer,
  PostCompanyFileReducer,
  PostGetFeedbackReducer,
  PostKYCdetailReducer,
  PostClearNotificationReducer,
  GetUserNotificationReducer,
  ShipmentLoaderTrueFalseReducer,
  ToggleSideBarTrueFalseReducer,
  GetAuthDetailsReducer,
  GetPermissionReducer,
  GetGoogleCityStateReducer
  


});

export default rootReducer;
