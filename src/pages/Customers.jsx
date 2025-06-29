import { createSignal, onMount } from "solid-js";
import { Kimai } from "../kimai";
import { CallIcon, MapIcon, OptionsIcon } from "../components/Icons";
import { openErrorModal } from "../components/ErrorModal";

export function Customers() {
  const [customers, setCustomers] = createSignal([]);

  onMount(async () => {
    setCustomers(await Kimai.getCustomers());
  });

  return (
    <ul class="list bg-base-100 rounded-box shadow-md pb-16">
      <For each={customers()}>
        {(customer, _) => (
          <li class="list-row flex justify-between items-center ">
            {customer.name}
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
              <button class="btn btn-square btn-ghost">
                <OptionsIcon />
              </button>
            </div>
          </li>
        )}
      </For>
    </ul>
  );
}
