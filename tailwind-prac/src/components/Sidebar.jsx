import home from '../assets/icons/home.png';
import orders from '../assets/icons/orders.png';
import products from '../assets/icons/products.png';
import delivery from '../assets/icons/delivery.png';
import marketing from '../assets/icons/marketing.png';
import analytics from '../assets/icons/analytics.png';
import payouts from '../assets/icons/payouts.png';
import discounts from '../assets/icons/discounts.png';
import audience from '../assets/icons/audience.png';
import appearence from '../assets/icons/appearence.png';
import plugins from '../assets/icons/plugins.png';
import nishyan from '../assets/icons/nishyan.svg';

const menuLists = [
  {
    icon: home,
    name: 'Home',
  },
  {
    icon: orders,
    name: 'Orders',
  },
  {
    icon: products,
    name: 'Products',
  },
  {
    icon: delivery,
    name: 'Delivery',
  },
  {
    icon: marketing,
    name: 'Marketing',
  },
  {
    icon: analytics,
    name: 'Analytics',
  },
  {
    icon: payouts,
    name: 'Payouts',
  },
  {
    icon: discounts,
    name: 'Discounts',
  },
  {
    icon: audience,
    name: 'Audience',
  },
  {
    icon: appearence,
    name: 'Appearence',
  },
  {
    icon: plugins,
    name: 'Plugins',
  },
];

function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 min-w-[224px] h-[100dvh] px-2.5 py-4 bg-[#1E2640] flex flex-col flex-grow items-center gap-6">
      <div className="flex items-center gap-3 w-[192px]">
        <div className="object-cover w-[39px] h-[39px]">
          <img src={nishyan} alt="nishyan" />
        </div>
        <div className="self-stretch text-white w-[108px]">
          <p className="text-[15px]/[22px] font-medium">Nishyan</p>
          <p className="text-[13px]/[16px] underline opacity-80">Visit store</p>
        </div>
        <div className="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M2.84685 7.22185C3.26727 6.80143 3.92516 6.76321 4.38876 7.10719L4.52157 7.22185L10 12.6997L15.4784 7.22185C15.8988 6.80143 16.5567 6.76321 17.0203 7.10719L17.1532 7.22185C17.5736 7.64227 17.6118 8.30016 17.2678 8.76376L17.1532 8.89657L10.8374 15.2124C10.4169 15.6328 9.75905 15.671 9.29545 15.327L9.16264 15.2124L2.84685 8.89657C2.38438 8.43411 2.38438 7.68431 2.84685 7.22185Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
