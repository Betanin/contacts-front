import constants from './constants';

export default (state = {}, action) => {
    
    switch (action.type) {
        case constants.LOAD_ALL:
            const loadItems = action.payload.items
                ? action.payload.items.map(item => {
                        return {
                            id: item._id,
                            name: item.name,
                            email: item.email,
                            company: item.company,
                            phone: item.phone
                        }
                    })
                : [];
            return {
                items: loadItems,
                filteredItems: [...loadItems],
                filter: '',
                selectedItems: state.selectedItems,
            };
        case constants.APPLY_FILTER:
            const filterItems = state.items
                ? state.items.map(item => {
                        return {
                            id: item.id,
                            name: item.name,
                            email: item.email,
                            company: item.company,
                            phone: item.phone
                        }
                    })
                : [];
            return {
                items: filterItems,
                filteredItems: action.payload.filter
                    ? filterItems.filter(item => {
                        const textToFilter = item.name + item.email + item.company + item.phone;
                        return textToFilter.includes(action.payload.filter);
                    })
                    : [...filterItems],
                filter: action.payload.filter,
                selectedItems: state.selectedItems,
            };
        case constants.SET_SELECTED_ITEMS:
            return {
                items: state.items,
                filteredItems: state.filteredItems,
                filter: state.filter,
                selectedItems: action.payload.selectedItems,
            };
        default:
            return state;
    }

}