"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Background from "../components/Background";

export default function AffiliatesPage() {
  return (
    <>
      <Background />
      <Header />
      <main className="min-h-screen px-4 py-12 text-white">
        <h1 className="text-3xl font-bold text-center mb-8 underline decoration-blue-600 decoration-4 underline-offset-4">
          Affiliates
        </h1>

        <section className="max-w-4xl mx-auto space-y-10">
          <p className="text-gray-300">
            At <span className="font-semibold text-blue-400">TCorpsHub</span>, we partner with trusted platforms and products that align with our creative and tech-driven mission. By using our affiliate links, you support what we do—at no extra cost to you. Explore and empower our collaborations!
          </p>

          {[{
            name: "pCloud",
            description: "Support Us & Get Secure Cloud Storage",
            url: "https://partner.pcloud.com/r/140845",
            image: "pcloud.png"
          }, {
            name: "Tangem (Hardware Wallet)",
            description: "Support Us & Secure Your Crypto Assets with Tangem!",
            url: "https://tangem.com/pricing/?promocode=E9EW5D",
            image: "tangem.png"
          }, {
            name: "Hostinger – Web Hosting",
            description: "Fast & Affordable Web Hosting with Hostinger",
            url: "https://hostinger.com?REFERRALCODE=Tcorps",
            image: "hostinger.png"
          }, {
            name: "Solidus AI Tech",
            description: "Support Us & Explore Cutting-Edge AI Solutions",
            url: "https://www.aitechpad.io/register?referred_by=bd0e31d5-10aa-44ac-84dc-a5a35afc97ff",
            image: "aitech.gif"
          }].map((item, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-center justify-between bg-white/5 p-6 rounded-lg border border-white/10">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-blue-400 mb-2">{item.name}</h2>
                <p className="text-gray-300 mb-2">{item.description}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Visit {item.name.split(" ")[0]}
                </a>
              </div>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 sm:mt-0 sm:ml-6"
              >
                <img
                  src={`/${item.image}`}
                  alt={`${item.name} Logo`}
                  className="w-40 max-h-32 object-contain rounded shadow-md"
                />
              </a>
            </div>
          ))}

          <div>
            <h3 className="text-xl font-semibold text-blue-400 mb-4 text-center">
              Protect Your Digital Assets! Now with a Discount!
            </h3>
            <div className="flex justify-center flex-wrap gap-6">
              {["tangem1.jpg", "tangem2.jpg", "tangem3.jpg"].map((img, i) => (
                <a
                  key={i}
                  href="https://tangem.com/pricing/?promocode=CZHQ96"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`/${img}`}
                    alt="Tangem Promo"
                    className="w-[200px] h-auto rounded shadow-md hover:scale-105 transition-transform"
                  />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
