import { assets } from "../assets/assets";

function Footer(){
    return (
        <div className="h-12 w-screen border-t-1 border-gray-300 flex items-center justify-between px-4 absolute bottom-0">
            <img className="h-9" src={assets.logo} alt="image showing tech jobs logo" />
            <p className="text-gray-600 text-sm text-center">Copyright @techjobs.in | All right reserved</p>
            <div className="flex justify-between items-center space-x-3">
                <img className="h-8 rounded-full border-1 border-black" src={assets.facebook_icon} alt="facebook icon" />
                <img className="h-8 rounded-full border-1 border-black" src={assets.twitter_icon} alt="twitter icon" />
                <img className="h-8 rounded-full border-1 border-black" src={assets.instagram_icon} alt="instagram icon" />
            </div>
        </div>
    )
}

export default Footer;