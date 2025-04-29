import { assets } from "../assets/assets";


function TrustedCompaniesBanner(){
    const trustedCompanies = [assets.microsoft_logo,assets.walmart_logo, assets.samsung_logo, assets.amazon_logo, assets.adobe_logo,assets.accenture_logo]
    return (
        <div className="flex justify-start px-4 h-16 mx-2 items-center border-2 border-gray-200 rounded-sm ">
            <p className="text-gray-600 text-lg mr-4">Trusted By: </p>
            <div className="flex items-center space-x-4">
            {
                trustedCompanies.map((companyLogo, index)=><img key={index} className="h-8 mx-6" src={companyLogo}/>)
            }
            </div>
        </div>
    )
}

export default TrustedCompaniesBanner;