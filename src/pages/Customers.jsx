import { createSignal, onMount } from "solid-js";
import { Kimai } from "../kimai";
import {
  CallIcon,
  MapIcon,
  OptionsIcon,
  SearchIcon,
} from "../components/Icons";
import { openErrorModal } from "../components/ErrorModal";
import {
  CustomerModal,
  loadCustomer,
  openCustomerModal,
} from "../components/CustomerModal";

export function Customers() {
  const [customers, setCustomers] = createSignal([]);

  onMount(async () => {
    setCustomers(await Kimai.getCustomers());
  });

  return (
    <>
      <CustomerModal />
      <ul class="list bg-base-100 rounded-box shadow-md">
        <li class="bg-base-300 p-4 pb-2 text-xs opacity-85 tracking-wide flex justify-between">
          <div class="flex">
            <button class="btn">Filter</button>
            <label class="input">
              <SearchIcon />
              <input
                onChange={async (e) =>
                  setCustomers(
                    await Kimai.getCustomers({
                      term: e.currentTarget.value,
                    }),
                  )
                }
                type="search"
                class="grow"
                placeholder="Suchen"
              />
            </label>
          </div>
          <button
            onClick={() => {
              openCustomerModal();
            }}
            class="btn btn-success"
          >
            +
          </button>
        </li>

        <For each={customers()}>
          {(customer, _) => (
            <li class="list-row flex justify-between items-center ">
              <div
                onClick={() => {
                  loadCustomer(customer.id);
                  openCustomerModal();
                }}
              >
                {customer.name}
              </div>
              <div class="flex">
                <button
                  onClick={async () => {
                    const cust = await Kimai.getCustomer(customer.id);
                    if (cust.mobile != null) {
                      window.open("tel:" + cust.mobile, "_blank").focus();
                    } else if (cust.phone != null) {
                      window.open("tel:" + cust.phone, "_blank").focus();
                    } else {
                      openErrorModal("Telefonnummer nicht eingeflegt");
                    }
                  }}
                  class="btn btn-square btn-ghost"
                >
                  <CallIcon />
                </button>
                <button
                  onClick={async () => {
                    const cust = await Kimai.getCustomer(customer.id);
                    if (cust.address != null) {
                      window.open("geo:0,0?q=" + cust.address).focus();
                    } else {
                      openErrorModal("Addresse nicht eingeflegt");
                    }
                  }}
                  class="btn btn-square btn-ghost"
                >
                  <MapIcon />
                </button>
                <div class="dropdown dropdown-end">
                  <div
                    tabindex="0"
                    role="button"
                    class="btn btn-square btn-ghost"
                  >
                    <OptionsIcon />
                  </div>
                  <ul
                    tabindex="0"
                    class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                  >
                    <li>
                      <a
                        onClick={() => {
                          openConfirmModal(
                            "Möchtest du diesen Kunden löschen?",
                            async () => {
                              await Kimai.deleteCustomer(customer.id);
                              setCustomers(await Kimai.getCustomers());
                            },
                          );
                        }}
                        class="text-error"
                      >
                        Löschen
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          )}
        </For>
      </ul>
    </>
  );
}
