import { NavLink } from "react-router-dom";
import Logo from "./svg/Logo";
export default function Header() {
  return (
    <div className="min-h-16 border-b-2 dark:bg-white/60 flex items-center">
      <div className="max_width flex justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <Logo /> <h2 className="font-black text-2xl">文件校验</h2>
        </NavLink>
      </div>
    </div>
  );
}
