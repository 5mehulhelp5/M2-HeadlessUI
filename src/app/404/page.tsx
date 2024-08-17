import Image from "next/image"
import Link from "next/link"
export default function page(){
    return(
        <div
        className="bg-white w-full pb-4"
      >
        <h2 className="text-4xl font-bold text-center">404 - Not Found</h2>

        <p className="pt-6 pb-16 text-base max-w-2xl text-primary text-center m-auto">
          Im guessing you spelled something wrong. Can you double check that
          URL?
        </p>
        <Image
          src="/images/404_error.svg"
          alt="Image 404"
          width={100}
          height={600}
          quality={75}
          
          className="w-[350px] md:w-4/12 justify-center text-center mx-auto"
        />
        <div className="mt-16 text-center">
          <Link href="/">
            <button className="bg-primary border border-white transition-all ease-in duration-150 hover:bg-white hover:text-black hover:border-primary text-white text-base rounded-full px-16 p-3 font-medium">
              Return Home
            </button>
          </Link>
        </div>
      </div>
    )
}