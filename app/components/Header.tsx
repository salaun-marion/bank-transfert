import Image from 'next/image';
import { Link } from '@/i18n/routing';
import img from '../../public/logo-512.png';
import '../styles/header.css';

export default function Header() {
  return (
    <div className="slogan-container">
      <Image src={img} width={100} height={100} alt="logo" />
      <h1>Orange Bank</h1>
      <p>The Bank that never lies</p>
      <Link href="/" locale="fr">
        <button className="buttonFR buttonLanguage">FR</button>
      </Link>
      <Link href="/" locale="en">
        <button className="buttonEN buttonLanguage">EN</button>
      </Link>
    </div>
  );
}
