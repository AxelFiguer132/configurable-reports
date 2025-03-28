<template>
    <tfoot class="h-16 bg-white sticky bottom-0">
      <tr>
        <th colspan="5">
          <div class="flex justify-between">
            <div class="ml-3 border-1 h-16 flex justify-center items-center"></div>
            <div class="flex justify-end items-center sticky right-1 text-gray-500">
              <div class="pr-5">
                <label class="pr-7" for="">Filas por página :</label>
                <select>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="200">200</option>
                </select>
              </div>
              <div class="pl-7">
                <p>1-0 de 0</p>
              </div>
              <div class="pr-5 pl-8 flex">
                <button class="rounded-full h-7 w-8 cursor-auto text-gray-400">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-7 h-7"
                  >
                    <rect width="1144" height="1140" transform="translate(-608 -396)" fill="none" />
                    <path
                      d="M18 17L13 12L18 7M11 17L6 12L11 7"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <button class="rounded-full h-7 w-8 cursor-auto text-gray-400">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-7 h-7"
                  >
                    <rect width="1144" height="1140" transform="translate(-608 -356)" fill="none" />
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <button class="rounded-full h-7 w-8 hover:text-black hover:bg-gray-300">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-7 h-7"
                  >
                    <rect width="1144" height="1140" transform="translate(-608 -436)" fill="none" />
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <button class="rounded-full h-7 w-8 hover:text-black hover:bg-gray-300">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-7 h-7"
                  >
                    <rect width="1144" height="1140" transform="translate(-608 -476)" fill="none" />
                    <path
                      d="M6 17L11 12L6 7M13 17L18 12L13 7"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </th>
      </tr>
    </tfoot>
  </template>