import { Category } from '../models';

export const CATEGORIES: Category[] = [
  {
    slug: 'television-display', name: 'Television & Display', icon: 'bi-tv',
    subCategories: [
      { slug: 'led-tv', name: 'LED TV', icon: 'bi-tv' },
      { slug: 'lcd-tv', name: 'LCD TV', icon: 'bi-tv' },
      { slug: 'smart-tv', name: 'Smart TV', icon: 'bi-tv' },
      { slug: 'android-tv', name: 'Android TV', icon: 'bi-tv' },
      { slug: 'qled-tv', name: 'QLED TV', icon: 'bi-tv' },
      { slug: 'oled-tv', name: 'OLED TV', icon: 'bi-tv' },
      { slug: 'tv-4k', name: '4K TV', icon: 'bi-tv' },
      { slug: 'tv-8k', name: '8K TV', icon: 'bi-tv' },
      { slug: 'monitor', name: 'Monitor', icon: 'bi-display' },
      { slug: 'gaming-monitor', name: 'Gaming Monitor', icon: 'bi-display' },
      { slug: 'projector', name: 'Projector', icon: 'bi-projector' },
    ]
  },
  {
    slug: 'computers', name: 'Computers', icon: 'bi-pc-display',
    subCategories: [
      { slug: 'desktop-pc', name: 'Desktop PC', icon: 'bi-pc-display-horizontal' },
      { slug: 'gaming-pc', name: 'Gaming PC', icon: 'bi-pc-display-horizontal' },
      { slug: 'laptop', name: 'Laptop', icon: 'bi-laptop' },
      { slug: 'mini-pc', name: 'Mini PC', icon: 'bi-cpu' },
      { slug: 'aio-pc', name: 'All-in-One PC', icon: 'bi-display' },
      { slug: 'workstation', name: 'Workstation', icon: 'bi-pc-display' },
    ]
  },
  {
    slug: 'computer-accessories', name: 'Computer Accessories', icon: 'bi-keyboard',
    subCategories: [
      { slug: 'keyboard', name: 'Keyboard', icon: 'bi-keyboard' },
      { slug: 'mouse', name: 'Mouse', icon: 'bi-mouse2' },
      { slug: 'gaming-mouse', name: 'Gaming Mouse', icon: 'bi-mouse2' },
      { slug: 'headphones', name: 'Headphones', icon: 'bi-headphones' },
      { slug: 'headset', name: 'Headset', icon: 'bi-headset' },
      { slug: 'webcam', name: 'Webcam', icon: 'bi-camera-video' },
      { slug: 'speakers', name: 'Speakers', icon: 'bi-speaker' },
      { slug: 'usb-hub', name: 'USB Hub', icon: 'bi-usb-plug' },
      { slug: 'hdmi-cable', name: 'HDMI Cable', icon: 'bi-usb-symbol' },
      { slug: 'display-cable', name: 'Display Cable', icon: 'bi-usb-symbol' },
      { slug: 'mouse-pad', name: 'Mouse Pad', icon: 'bi-square' },
    ]
  },
  {
    slug: 'mobile-charging', name: 'Mobile & Charging', icon: 'bi-phone-vibrate',
    subCategories: [
      { slug: 'mobile-charger', name: 'Mobile Charger', icon: 'bi-plug' },
      { slug: 'fast-charger', name: 'Fast Charger', icon: 'bi-lightning-charge' },
      { slug: 'wireless-charger', name: 'Wireless Charger', icon: 'bi-magnet' },
      { slug: 'power-bank', name: 'Power Bank', icon: 'bi-battery-charging' },
      { slug: 'usb-cable', name: 'USB Cable', icon: 'bi-usb-symbol' },
      { slug: 'type-c-cable', name: 'Type-C Cable', icon: 'bi-usb-symbol' },
      { slug: 'lightning-cable', name: 'Lightning Cable', icon: 'bi-usb-symbol' },
      { slug: 'car-charger', name: 'Car Charger', icon: 'bi-car-front' },
    ]
  },
  {
    slug: 'home-appliances', name: 'Home Appliances', icon: 'bi-house-gear',
    subCategories: [
      { slug: 'fan', name: 'Fan', icon: 'bi-fan' },
      { slug: 'ceiling-fan', name: 'Ceiling Fan', icon: 'bi-fan' },
      { slug: 'pedestal-fan', name: 'Pedestal Fan', icon: 'bi-fan' },
      { slug: 'exhaust-fan', name: 'Exhaust Fan', icon: 'bi-fan' },
      { slug: 'air-cooler', name: 'Air Cooler', icon: 'bi-wind' },
      { slug: 'heater', name: 'Heater', icon: 'bi-fire' },
      { slug: 'iron', name: 'Iron', icon: 'bi-inboxes' },
      { slug: 'blender', name: 'Blender', icon: 'bi-cup-hot' },
      { slug: 'juicer', name: 'Juicer', icon: 'bi-cup-straw' },
      { slug: 'microwave', name: 'Microwave', icon: 'bi-microwave' },
      { slug: 'refrigerator', name: 'Refrigerator', icon: 'bi-box2' },
      { slug: 'washing-machine', name: 'Washing Machine', icon: 'bi-droplet' },
      { slug: 'air-conditioner', name: 'Air Conditioner', icon: 'bi-snow' },
    ]
  },
  {
    slug: 'electronics-accessories', name: 'Electronics & Accessories', icon: 'bi-plug',
    subCategories: [
      { slug: 'led-bulbs', name: 'LED Bulbs', icon: 'bi-lightbulb' },
      { slug: 'smart-bulbs', name: 'Smart Bulbs', icon: 'bi-lightbulb-fill' },
      { slug: 'extension-boards', name: 'Extension Boards', icon: 'bi-plug-fill' },
      { slug: 'switches', name: 'Switches', icon: 'bi-toggle2-on' },
      { slug: 'adapters', name: 'Adapters', icon: 'bi-plug' },
      { slug: 'batteries', name: 'Batteries', icon: 'bi-battery-full' },
      { slug: 'remote-controls', name: 'Remote Controls', icon: 'bi-remote' },
      { slug: 'cables', name: 'Cables', icon: 'bi-usb-symbol' },
      { slug: 'connectors', name: 'Connectors', icon: 'bi-diagram-2' },
      { slug: 'electronic-components', name: 'Electronic Components', icon: 'bi-cpu' },
    ]
  },
];
