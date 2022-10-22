import { takeLatest, all, call, put } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../../Utils/firebase/firebase";
import {
  fetchCategoriesFailed,
  fetchCategoriesSucceeded,
} from "./categoryAction";
import { CATEGORIES_ACTION_TYPE } from "./categoryTypes";

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, "categories");
    yield put(fetchCategoriesSucceeded(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}