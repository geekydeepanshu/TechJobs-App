import { assets } from "../assets/assets";


function TrustedCompaniesBanner(){
    const trustedCompanies = [assets.microsoft_logo,assets.walmart_logo,assets.accenture_logo, assets.samsung_logo, assets.amazon_logo, assets]
    return (
        <div className="flex justify-between items-center border-1 border-gray-300 rounded-sm">
            <p className="text-gray-600 text-lg mr-4">Trusted By: </p>
            <div className="flex items-center space-x-4">
            {
                trustedCompanies.map((companyLogo)=><img className="h-6 " src={companyLogo}/>)
            }
            </div>
        </div>
    )
}

export default TrustedCompaniesBanner;