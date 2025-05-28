import api from './api';
import appConfig from '../config/appConfig.js';

export const menuService = {
    async getMenus() {
        try {
            const response = await api.get(appConfig.api.endpoints.getMenus);

            // Transform flat structure to hierarchy
            const data = response.data;
            const menuMap = {};
            const rootMenus = [];

            // First pass: create menu item objects
            data.forEach(item => {
                // Map backend fields to frontend expected fields
                menuMap[item.id] = {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    url: item.url,
                    icon: item.icon,
                    parentId: item.parentId,
                    displayOrder: item.displayOrder || 0,
                    isActive: item.isActive !== undefined ? item.isActive : true,
                    children: []
                };
            });

            // Second pass: build hierarchy
            data.forEach(item => {
                if (item.parentId) {
                    // This is a child item
                    if (menuMap[item.parentId]) {
                        menuMap[item.parentId].children.push(menuMap[item.id]);
                    }
                } else {
                    // This is a root item
                    rootMenus.push(menuMap[item.id]);
                }
            });

            // Sort menus based on displayOrder
            const sortByDisplayOrder = (a, b) => a.displayOrder - b.displayOrder;

            // Sort root menus
            rootMenus.sort(sortByDisplayOrder);

            // Sort children recursively
            const sortChildren = (menu) => {
                if (menu.children && menu.children.length > 0) {
                    menu.children.sort(sortByDisplayOrder);
                    menu.children.forEach(sortChildren);
                }
            };

            rootMenus.forEach(sortChildren);

            return rootMenus;
        } catch (error) {
            console.error('Failed to fetch menu items', error);
            throw error.response?.data || { error: 'Failed to fetch menu items' };
        }
    }
};

export default menuService;