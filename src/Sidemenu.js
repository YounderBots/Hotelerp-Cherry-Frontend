

import { Search, Home, Users, CalendarCheck, Moon, MessageCircleQuestion, ClipboardCheck, Utensils, Layers, Bell, User, ChevronRight, Menu, X, ChevronDown, Sun } from 'lucide-react';

export const ICON_MAP = {
  dashboard: Home,
  reservation: CalendarCheck,
  "night-auditing": Moon,
  "guest-enquiry": MessageCircleQuestion,
  "house-keeper": ClipboardCheck,
  hrm: Users,
  restaurant: Utensils,
  "master-data": Layers
};

export const MENU =
    [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: Home,
            path: "/dashboard",
        },
        {
            id: "reservation",
            label: "Reservation",
            icon: CalendarCheck,
            path: "/reservation",
        },
        {
            id: "night-auditing",
            label: "Night Audit",
            icon: Moon,
            path: "/dashboard/admin/night-auditing",
            children: [
                {
                    label: "Reports",
                    children: [ 
                        {
                            label: "User Reserved Details",
                            path: "/night-auditing/user-reserved-details"
                        },
                        {
                            label: "Room Booked Details",
                            path: "/night-auditing/room-booked-details"
                        },
                        {
                            label: "Settlement Summary",
                            path: "/night-auditing/settlement-summary"
                        }
                    ]
                }
            ]
        },

        {
            id: "guest-enquiry",
            label: "Guest Enquiry",
            icon: MessageCircleQuestion,
            path: "/dashboard/admin",
        },
        {
            id: "house-keeper",
            label: "House Keeper",
            icon: ClipboardCheck,
            path: "/dashboard/admin",
        },
        {
            id: "hrm",
            label: "HRM",
            icon: Users,
            path: "/dashboard/admin",
        },
        {
            id: "restaurant",
            label: "Restaurant",
            icon: Utensils,
            path: "/dashboard/admin/restaurant",
            children: [

                {
                    label: "Floor & Table Setup",
                    children: [
                        {
                            label: "Floor Layout",
                            path: "/restaurant/floor-layout"
                        },
                        {
                            label: "Table Master",
                            path: "/restaurant/table-master"
                        }
                    ]
                },

                {
                    label: "Order Management",
                    path: "/restaurant/orders"
                },

                {
                    label: "Table Reservation",
                    path: "/restaurant/table-reservation"
                },

                {
                    label: "Menu Management",
                    path: "/restaurant/menu-management"
                },

                {
                    label: "Kitchen Orders",
                    children: [
                        {
                            label: "Main Kitchen",
                            path: "/restaurant/kot/main-kitchen"
                        },
                        {
                            label: "Grill",
                            path: "/restaurant/kot/grill"
                        },
                        {
                            label: "Dessert",
                            path: "/restaurant/kot/dessert"
                        },
                        {
                            label: "Bar",
                            path: "/restaurant/kot/bar"
                        }
                    ]
                },

                {
                    label: "Billing & Payments",
                    path: "/restaurant/billing-payments"
                },

                {
                    label: "Inventory",
                    children: [
                        {
                            label: "Stock",
                            path: "/restaurant/inventory/stock"
                        },
                        {
                            label: "Recipe Management",
                            path: "/restaurant/inventory/recipe-management"
                        }
                    ]
                },

                {
                    label: "Staff Management",
                    children: [
                        {
                            label: "Staff Master",
                            path: "/restaurant/staff/master"
                        },
                        {
                            label: "Staff Planning",
                            path: "/restaurant/staff/planning"
                        }
                    ]
                },

                {
                    label: "Guest Management",
                    path: "/restaurant/guest-management"
                },

                {
                    label: "Report & Analytics",
                    path: "/restaurant/reports-analytics"
                }

            ]
        },

        {
            id: "master-data",
            label: "Master Data",
            icon: Layers,
            path: "/master-data",
            children: [

                {
                    label: "Facilities",
                    path: "/facilities"
                },

                {
                    label: "Room Type",
                    path: "/room_type"
                },

                {
                    label: "Bed Type",
                    path: "/bed_type"
                },

                {
                    label: "Hall / Floor",
                    path: "/hall_floor"
                },

                {
                    label: "Rooms",
                    path: "/rooms"
                },

                {
                    label: "Discount Type",
                    path: "/discount_type"
                },

                {
                    label: "Tax Types",
                    path: "/tax_types"
                },

                {
                    label: "Payment Methods",
                    path: "/payment_methods"
                },

                {
                    label: "Identification Proof",
                    path: "/identification_proof"
                },

                {
                    label: "Currency & Country",
                    path: "/currency_country"
                },

                {
                    label: "HSK Task Type",
                    path: "/hsk_task_type"
                },

                {
                    label: "Complementary",
                    path: "/complementary"
                },

                {
                    label: "Reservation Status",
                    path: "/reservation_status"
                }

            ]
        },
    ]

export const getMenuList = async () => {
  try {
    const res = await fetch("http://localhost:5000/");

    if (!res.ok) {
      throw new Error(`API failed: ${res.status}`);
    }

    const data = await res.json();

    // ✅ Ensure the API response is an array
    if (!Array.isArray(data.message)) {
      console.warn("Menu API did not return array. Using fallback MENU.");
      return MENU;
    }

    return data;
  } catch (error) {
    console.error("Menu API error. Using fallback MENU.", error);
    return MENU; // ✅ fallback
  }
};



