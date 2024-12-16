import Link from 'next/link';
import NavHomeUserClient from '../NavHomeUserClient';

export default function NavHomeUser() {
  return (
    <div className="topbar_flex space-x-24 justify-between">
      <Link href="/home_user">
        <div className="flex flex-row items-center">
          {/* <div>
            <p className="topbar_j_font">J</p>
          </div> */}
          <div>
            <p className="topbar_uliett_font">JULIETT</p>
          </div>
        </div>
      </Link>
      <NavHomeUserClient />
    </div>
  );
}