import { createSlice } from "@reduxjs/toolkit";

type UiState = {
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
};

const initialState: UiState = {
  isSearchOpen: false,
  isMobileMenuOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openSearch(state) {
      state.isSearchOpen = true;
      state.isMobileMenuOpen = false;
    },
    closeSearch(state) {
      state.isSearchOpen = false;
    },
    toggleSearch(state) {
      state.isSearchOpen = !state.isSearchOpen;
    },
    openMobileMenu(state) {
      state.isMobileMenuOpen = true;
      state.isSearchOpen = false;
    },
    closeMobileMenu(state) {
      state.isMobileMenuOpen = false;
    },
    toggleMobileMenu(state) {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
  },
});

export const {
  openSearch,
  closeSearch,
  toggleSearch,
  openMobileMenu,
  closeMobileMenu,
  toggleMobileMenu,
} = uiSlice.actions;

export default uiSlice.reducer;
