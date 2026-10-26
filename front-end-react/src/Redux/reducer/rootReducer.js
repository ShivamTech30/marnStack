import { combineReducers } from "redux";
import {
  ToggleSideBarReducer,
  HeaderToggleClassAddReducer,
  ToggleSideBarTrueFalseReducer,
  PostAddProductReducer,
  GetAllProductReducer,
  PatchCartReducer,
  DeleteCartReducer,
  PostCommentReducer,
  GetCommentsReducer
} from "./Reducer";

const rootReducer = combineReducers({
  ToggleSideBarReducer,
  HeaderToggleClassAddReducer,
  ToggleSideBarTrueFalseReducer,
  PostAddProductReducer,
  GetAllProductReducer,
  PatchCartReducer,
  DeleteCartReducer,
  PostCommentReducer,
  GetCommentsReducer
});

export default rootReducer;
