import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'

export default function Header() { 
  const router = useRouter()

  const onHomeClick = () => {
    console.log(window.location.pathname);
    router.reload(window.location.pathname)
  };
  
  return (
    <header className="bg-white w-full">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-3 flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" onClick={() => {
                router.push({
                  pathname: '/',
                })
              }}>
                <span className="sr-only">Hermit</span>
                <Image
                  className="h-10 w-auto"
                  src="/logo_gray.png"
                  alt="Logo"
                  width={102}
                  height={66}
                />
            </a>

          </div>
          <div className="ml-10 space-x-4">
            <a href={"/faq"} className="text-base font-medium text-gray-700 hover:text-gray-500">
              FAQ
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
} 