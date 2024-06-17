import React from 'react';

const OrderMe = () => {
  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Theo dõi mã đơn hàng của bạn có mã: #957684673
        </h2>

        <div className="mt-6 sm:mt-8 lg:flex lg:gap-8">
          <div className="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700 lg:max-w-xl xl:max-w-2xl">
            {[
              {
                imgLight: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-light.svg',
                imgDark: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-dark.svg',
                productName: 'APPLE iPhone 15 5G phone, 256GB, Gold',
                productId: 'BJ8364854',
                quantity: 3,
                price: 2997,
              },
            ].map((item, index) => (
              <div key={index} className="space-y-4 p-6">
                <div className="flex items-center gap-6">
                  <a href="#" className="h-14 w-14 shrink-0">
                    <img className="h-full w-full dark:hidden" src={item.imgLight} alt="product image" />
                    <img className="hidden h-full w-full dark:block" src={item.imgDark} alt="product image" />
                  </a>
                  <a href="#" className="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white">
                    {item.productName}
                  </a>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-gray-900 dark:text-white">Product ID:</span> {item.productId}
                  </p>

                  <div className="flex items-center justify-end gap-4">
                    <p className="text-base font-normal text-gray-900 dark:text-white">x{item.quantity}</p>
                    <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">${item.price}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="space-y-4 bg-gray-50 p-6 dark:bg-gray-800">
              <div className="space-y-2">
                <dl className="flex items-center justify-between gap-4">
                  <dt className="font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">$6,592.00</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4">
                  <dt className="font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                  <dd className="text-base font-medium text-green-500">-$299.00</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4">
                  <dt className="font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">$99</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4">
                  <dt className="font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">$799</dd>
                </dl>
              </div>

              <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                <dt className="text-lg font-bold text-gray-900 dark:text-white">Total</dt>
                <dd className="text-lg font-bold text-gray-900 dark:text-white">$7,191.00</dd>
              </dl>
            </div>
          </div>

          <div className="mt-6 grow sm:mt-8 lg:mt-0">
            <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Tiến độ đơn hàng</h3>

              <ol className="relative ms-3 border-s border-gray-200 dark:border-gray-700">
                {[
                  {
                    date: '24 Nov 2023',
                    status: 'Đã giao',
                    icon: (
                      <svg
                        className="h-6 w-6 text-blue-600 dark:text-blue-400"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
                      </svg>
                    ),
                  },
                  {
                    date: 'Today',
                    status: 'Đang giao',
                    icon: (
                      <svg
                        className="h-6 w-6 text-blue-600 dark:text-blue-400"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                      </svg>
                    ),
                  },
                  {
                    date: '23 Nov 2023, 15:15',
                    status: 'Đã nhận đơn',
                    icon: (
                      <svg
                        className="h-6 w-6 text-blue-600 dark:text-blue-400"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 11.917 9.724 16.5 19 7.5" />
                      </svg>
                    ),
                  },
                  {
                    date: '22 Nov 2023, 12:27',
                    status: 'Đang xử lý',
                    icon: (
                      <svg
                        className="h-6 w-6 text-blue-600 dark:text-blue-400"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20.25 8.511A1.751 1.751 0 0 0 18.5 6.76h-1.5V4.49A1.5 1.5 0 0 0 15.5 3h-8a1.5 1.5 0 0 0-1.5 1.49V6.76H4a1.751 1.751 0 0 0-1.75 1.751v10.5A1.75 1.75 0 0 0 4 20.512h14.5a1.75 1.75 0 0 0 1.75-1.751v-10.25Z" />
                      </svg>
                    ),
                  },
                ].map((history, index) => (
                  <li key={index} className={`ml-6 ${index !== 0 ? 'mt-6' : ''}`}>
                    <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                      {history.icon}
                    </span>
                    <h3 className="text-base font-medium leading-tight text-gray-900 dark:text-white">{history.status}</h3>
                    <time className="mb-1 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{history.date}</time>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderMe;

