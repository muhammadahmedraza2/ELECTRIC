import { MenuNode } from '../models';

/**
 * Single source of truth for sidebar navigation.
 * Sidebar renders this recursively — never hardcode menu HTML per item.
 */
export const MENU_CONFIG: MenuNode[] = [
  { id: 1, name: 'Home', icon: 'bi-house-door', route: '/app/dashboard' },
  {
    id: 2, name: 'Electronics', icon: 'bi-cpu',
    children: [
      {
        id: 21, name: 'Television & Display', icon: 'bi-tv',
        children: [
          { id: 211, name: 'LED TV', route: '/app/electronics/led-tv' },
          { id: 212, name: 'LCD TV', route: '/app/electronics/lcd-tv' },
          { id: 213, name: 'Smart TV', route: '/app/electronics/smart-tv' },
          { id: 214, name: 'Android TV', route: '/app/electronics/android-tv' },
          { id: 215, name: 'QLED TV', route: '/app/electronics/qled-tv' },
          { id: 216, name: 'OLED TV', route: '/app/electronics/oled-tv' },
          { id: 217, name: '4K TV', route: '/app/electronics/tv-4k' },
          { id: 218, name: '8K TV', route: '/app/electronics/tv-8k' },
          { id: 219, name: 'Monitor', route: '/app/electronics/monitor' },
          { id: 2110, name: 'Gaming Monitor', route: '/app/electronics/gaming-monitor' },
          { id: 2111, name: 'Projector', route: '/app/electronics/projector' },
        ]
      },
      {
        id: 22, name: 'Computers', icon: 'bi-pc-display',
        children: [
          { id: 221, name: 'Desktop PC', route: '/app/electronics/desktop-pc' },
          { id: 222, name: 'Gaming PC', route: '/app/electronics/gaming-pc' },
          { id: 223, name: 'Laptop', route: '/app/electronics/laptop' },
          { id: 224, name: 'Mini PC', route: '/app/electronics/mini-pc' },
          { id: 225, name: 'All-in-One PC', route: '/app/electronics/aio-pc' },
          { id: 226, name: 'Workstation', route: '/app/electronics/workstation' },
        ]
      },
      {
        id: 23, name: 'Computer Accessories', icon: 'bi-keyboard',
        children: [
          { id: 231, name: 'Keyboard', route: '/app/electronics/keyboard' },
          { id: 232, name: 'Mouse', route: '/app/electronics/mouse' },
          { id: 233, name: 'Gaming Mouse', route: '/app/electronics/gaming-mouse' },
          { id: 234, name: 'Headphones', route: '/app/electronics/headphones' },
          { id: 235, name: 'Headset', route: '/app/electronics/headset' },
          { id: 236, name: 'Webcam', route: '/app/electronics/webcam' },
          { id: 237, name: 'Speakers', route: '/app/electronics/speakers' },
          { id: 238, name: 'USB Hub', route: '/app/electronics/usb-hub' },
          { id: 239, name: 'HDMI Cable', route: '/app/electronics/hdmi-cable' },
          { id: 2310, name: 'Display Cable', route: '/app/electronics/display-cable' },
          { id: 2311, name: 'Mouse Pad', route: '/app/electronics/mouse-pad' },
        ]
      },
      {
        id: 24, name: 'Mobile & Charging', icon: 'bi-phone-vibrate',
        children: [
          { id: 241, name: 'Mobile Charger', route: '/app/electronics/mobile-charger' },
          { id: 242, name: 'Fast Charger', route: '/app/electronics/fast-charger' },
          { id: 243, name: 'Wireless Charger', route: '/app/electronics/wireless-charger' },
          { id: 244, name: 'Power Bank', route: '/app/electronics/power-bank' },
          { id: 245, name: 'USB Cable', route: '/app/electronics/usb-cable' },
          { id: 246, name: 'Type-C Cable', route: '/app/electronics/type-c-cable' },
          { id: 247, name: 'Lightning Cable', route: '/app/electronics/lightning-cable' },
          { id: 248, name: 'Car Charger', route: '/app/electronics/car-charger' },
        ]
      },
      {
        id: 25, name: 'Home Appliances', icon: 'bi-house-gear',
        children: [
          { id: 251, name: 'Fan', route: '/app/electronics/fan' },
          { id: 252, name: 'Ceiling Fan', route: '/app/electronics/ceiling-fan' },
          { id: 253, name: 'Pedestal Fan', route: '/app/electronics/pedestal-fan' },
          { id: 254, name: 'Exhaust Fan', route: '/app/electronics/exhaust-fan' },
          { id: 255, name: 'Air Cooler', route: '/app/electronics/air-cooler' },
          { id: 256, name: 'Heater', route: '/app/electronics/heater' },
          { id: 257, name: 'Iron', route: '/app/electronics/iron' },
          { id: 258, name: 'Blender', route: '/app/electronics/blender' },
          { id: 259, name: 'Juicer', route: '/app/electronics/juicer' },
          { id: 2510, name: 'Microwave', route: '/app/electronics/microwave' },
          { id: 2511, name: 'Refrigerator', route: '/app/electronics/refrigerator' },
          { id: 2512, name: 'Washing Machine', route: '/app/electronics/washing-machine' },
          { id: 2513, name: 'Air Conditioner', route: '/app/electronics/air-conditioner' },
        ]
      },
      {
        id: 26, name: 'Electronics & Accessories', icon: 'bi-plug',
        children: [
          { id: 261, name: 'LED Bulbs', route: '/app/electronics/led-bulbs' },
          { id: 262, name: 'Smart Bulbs', route: '/app/electronics/smart-bulbs' },
          { id: 263, name: 'Extension Boards', route: '/app/electronics/extension-boards' },
          { id: 264, name: 'Switches', route: '/app/electronics/switches' },
          { id: 265, name: 'Adapters', route: '/app/electronics/adapters' },
          { id: 266, name: 'Batteries', route: '/app/electronics/batteries' },
          { id: 267, name: 'Remote Controls', route: '/app/electronics/remote-controls' },
          { id: 268, name: 'Cables', route: '/app/electronics/cables' },
          { id: 269, name: 'Connectors', route: '/app/electronics/connectors' },
          { id: 2610, name: 'Electronic Components', route: '/app/electronics/electronic-components' },
        ]
      }
    ]
  },
  { id: 3, name: 'Products', icon: 'bi-grid-3x3-gap', route: '/app/products' },
  { id: 4, name: 'Cart', icon: 'bi-cart3', route: '/app/cart' },
  { id: 5, name: 'Wishlist', icon: 'bi-heart', route: '/app/wishlist' },
  { id: 6, name: 'Orders', icon: 'bi-receipt', route: '/app/orders' },
  { id: 7, name: 'Offers', icon: 'bi-gift', route: '/app/offers' },
  { id: 8, name: 'Reports', icon: 'bi-bar-chart-line', route: '/app/reports' },
  { id: 9, name: 'Help', icon: 'bi-question-circle', route: '/app/help' },
];
