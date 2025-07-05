import { createSignal } from "solid-js";
import { Kimai } from "../kimai";

const [name, setName] = createSignal(null);
const [address, setAddress] = createSignal(null);
const [phone, setPhone] = createSignal(null);
const [email, setEmail] = createSignal(null);
const [comment, setComment] = createSignal(null);
const [timezone, setTimezone] = createSignal("Europe/Berlin");
const [country, setCountry] = createSignal("DE");
const [currency, setCurrency] = createSignal("EUR");
const [id, setId] = createSignal(null);

export function openCustomerModal() {
  document.getElementById("customer_modal").show();
}

export function closeCustomerModal() {
  document.getElementById("customer_modal").close();
  resetModal();
}

export function resetModal() {
  setName(null);
  setAddress(null);
  setPhone(null);
  setEmail(null);
  setComment(null);
  setTimezone("Europe/Berlin");
  setCountry("DE");
  setCurrency("EUR");
  setId(null);
}

export async function loadCustomer(id) {
  const customer = await Kimai.getCustomer(id);
  setName(customer.name);
  setAddress(customer.address);
  setPhone(customer.phone);
  setEmail(customer.email);
  setComment(customer.comment);
  setTimezone(customer.timezone);
  setCurrency(customer.currency);
  setId(customer.id);
}

export async function saveCustomer() {
  const options = {
    comment: comment(),
    phone: phone(),
    email: email(),
  };

  if (id()) {
    await Kimai.updateCustomer(
      id(),
      name(),
      country(),
      currency(),
      timezone(),
      options,
    );
  } else {
    await Kimai.createCustomer(
      name(),
      country(),
      currency(),
      timezone(),
      options,
    );
  }

  closeCustomerModal();
}

export function CustomerModal() {
  return (
    <dialog id="customer_modal" class="modal">
      <div class="modal-box max-w-lg">
        <h3 class="font-bold text-lg mb-4">Kunde anlegen</h3>

        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-2">
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input
              value={name()}
              onInput={(e) => setName(e.currentTarget.value)}
              type="text"
              placeholder=""
              class="input w-full"
            />
          </div>
          <div class="col-span-2">
            <label class="label">
              <span class="label-text">Adresse</span>
            </label>
            <input
              value={address()}
              onInput={(e) => setAddress(e.currentTarget.value)}
              type="text"
              placeholder=""
              class="input w-full"
            />
          </div>

          <div>
            <label class="label">
              <span class="label-text">Telefon</span>
            </label>
            <input
              value={phone()}
              onInput={(e) => setPhone(e.currentTarget.value)}
              type="tel"
              placeholder=""
              class="input w-full"
            />
          </div>
          <div>
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              value={email()}
              onInput={(e) => setEmail(e.currentTarget.value)}
              type="email"
              placeholder=""
              class="input w-full"
            />
          </div>
          <div class="col-span-2">
            <label class="label">
              <span class="label-text">Beschreibung</span>
            </label>
            <textarea
              class="textarea textarea-bordered w-full"
              rows="3"
              value={comment()}
              onInput={(e) => setComment(e.currentTarget.value)}
            />
          </div>
          <div class="collapse bg-base-100 border-base-300 border w-full col-span-2">
            <input type="checkbox" />
            <div class="collapse-title">Extras</div>
            <div class="collapse-content grid grid-cols-2 gap-4">
              <div class="col-span-2">
                <label class="label">
                  <span class="label-text">Zeitzone</span>
                </label>
                <input
                  value={timezone()}
                  onInput={(e) => setTimezone(e.currentTarget.value)}
                  type="text"
                  placeholder=""
                  class="input w-full"
                />
              </div>

              <div>
                <label class="label">
                  <span class="label-text">Land</span>
                </label>
                <input
                  value={country()}
                  onInput={(e) => setCountry(e.currentTarget.value)}
                  type="text"
                  placeholder=""
                  class="input w-full"
                />
              </div>

              <div>
                <label class="label">
                  <span class="label-text">Währung</span>
                </label>
                <input
                  value={currency()}
                  onInput={(e) => setCurrency(e.currentTarget.value)}
                  type="text"
                  placeholder=""
                  class="input w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="modal-action">
          <button class="btn btn-primary" onClick={() => saveCustomer()}>
            Speichern
          </button>
          <button class="btn" onClick={() => closeCustomerModal()}>
            Schließen
          </button>
        </div>
      </div>
    </dialog>
  );
}
