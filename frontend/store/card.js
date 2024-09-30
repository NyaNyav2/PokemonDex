import { create } from "zustand"
export const useCardStore = create((set)=>({
    cards: [],
    totalPages: 0, // Keep track of total pages
    currentPage: 1, // Trang hiện tại
    hasNextPage: false, // Cờ kiểm tra có trang tiếp theo không
    setCards:(cards) => set({cards}),
    createCards:async (newCards) =>{
      if(!newCards.name || !newCards.generation || !newCards.type1 || !newCards.type2 || !newCards.species || !newCards.special_group){
        return {success:false, message:"Fill in the form"}
      }
      const res = await fetch("/api/cards",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(newCards)
      })
      const data = await res.json();
      set((state) => ({cards:[... state.cards,data.data]}))
      return {success:true, message:"Success"}
    },
    fetchCard: async (page = 1) => {
      const limit = 9; // Fetch 10 cards per page
      try {
        const response = await fetch(`/api/cards?page=${page}&limit=${limit}`);
        const data = await response.json();
        
        // If it's the first page, we replace the cards state; otherwise, we append to it
        set((state) => ({
          cards: page === 1 ? data.data : [...state.cards, ...data.data],
        }));
  
        return data.data; // Return the fetched cards to check for pagination logic
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    },
   findCard : async (searchName,page=1)=>{
    if(!searchName.name){
      return{success:false, message:"fill in the search bar"}
    }
      const limit = 9
      try{
        const find = await fetch(`/api/cards?search=${searchName.name}&page=${page}&limit=${limit}`)
        const data = await find.json();
        set((state) => ({
          cards: page === 1 ? data.data : [...state.cards, ...data.data],
          totalPages:data.totalPages
        }));
        return {
          success: true,
          message: "Cards fetched successfully",
          totalPages: data.totalPages,
        };
        
      }catch (error) {
        console.error("Error fetching cards:", error);
        return {
          success: false,
          message: "Failed to fetch cards",
        };
      }
    
   },
   // New function to filter cards based on multiple criteria
   filterCards: async (filters, page = 1) => {
    const limit = 9;
    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(filters.generation && { generation: filters.generation }),
      ...(filters.type1 && { type1: filters.type1 }),
      ...(filters.species && { species: filters.species }),
      ...(filters.special_group && { special_group: filters.special_group }),
    }).toString();

    try {
      const response = await fetch(`/api/cards?${query}`);
      const data = await response.json();

      // Cập nhật state
      set((state) => ({
        cards: page === 1 ? data.data : [...state.cards, ...data.data], // Hợp nhất dữ liệu nếu không phải trang 1
        totalPages: data.totalPages,
        currentPage: page, // Lưu lại trang hiện tại
        hasNextPage: page < data.totalPages, // Kiểm tra có còn trang tiếp theo không
      }));

      return {
        success: true,
        message: "Cards filtered successfully",
        totalPages: data.totalPages,
      };
    } catch (error) {
      console.error("Error filtering cards:", error);
      return {
        success: false,
        message: "Failed to filter cards",
      };
    }
  },
}))