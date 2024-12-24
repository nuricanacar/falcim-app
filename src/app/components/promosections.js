export default function Example() {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0">
              <img
                src="https://tailwindui.com/img/ecommerce-images/home-page-01-feature-section-01.jpg"
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="relative bg-gray-900 bg-opacity-75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
              <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  <span className="block sm:inline">Tutkunuzu seçin</span>
                </h2>
                <p className="mt-3 text-xl text-white">
                  Uçsuz bucaksız bu fal dünyasında hangi taraftasınız?
                </p>
                <div className="flex space-x-4 mt-8">
  <a
    href="#"
    className="block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
  >
    Fal Baktırmak İstiyorum
  </a>
  <a
    href="#"
    className="block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
  >
    Fal Bakmak İstiyorum
  </a>
</div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  