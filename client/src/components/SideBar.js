import { GoStack } from 'react-icons/go';
import { GrTransaction } from 'react-icons/gr';
import { PiListMagnifyingGlass } from 'react-icons/pi';
import SideBarNavItem from './SideBarNavItem';
import { RiBarChart2Line } from 'react-icons/ri';

const SideBar = () => {
  return (
    <aside className='sticky h-auto bg-zinc-700'>
      <nav className='flex h-screen flex-col justify-between'>
        <ul>
          <SideBarNavItem
            label='Accounts'
            path='/accounts'
            icon={<GoStack />}
          />
          <SideBarNavItem
            label='Cash Flow'
            path='/cash-flow'
            icon={<RiBarChart2Line />}
          />
          <SideBarNavItem
            label='Overview'
            path='/overview'
            icon={<PiListMagnifyingGlass />}
          />
          <SideBarNavItem
            label='Transactions'
            path='/transactions'
            icon={<GrTransaction />}
          />
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
