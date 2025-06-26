import { createSignal } from "solid-js";
import { Kimai } from "../kimai";

export default function Login() {
  const [url, setUrl] = createSignal("https://");
  const [password, setPassword] = createSignal("");
  const [message, setMessage] = createSignal("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    Kimai.setApiKey(password());
    Kimai.setJsonApi(url());

    if (await Kimai.ping()) {
      location.reload();
      return;
    }

    setMessage("Wrong URL or Key");
  };

  return (
    <div class="flex items-center justify-center h-screen bg-base-100">
      <div class="w-full max-w-md p-8 space-y-3 bg-base-200 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center">Login</h2>
        <h3 class="text-xl font-bold text-center text-error">{message()}</h3>
        <form onSubmit={handleSubmit} class="space-y-4">
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">
              API Url
            </label>
            <input
              type="url"
              value={url()}
              onInput={(e) => setUrl(e.currentTarget.value)}
              required
              class="input input-bordered w-full validator"
              placeholder="https://"
              pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9-].*[a-zA-Z0-9])?.)+[a-zA-Z].*$"
              title="Must be valid URL"
            />
            <p class="validator-hint">Must be valid URL</p>

            <label class="block mb-1 text-sm font-medium text-gray-700">
              API Key
            </label>
            <input
              type="password"
              value={password()}
              onInput={(e) => setPassword(e.currentTarget.value)}
              required
              class="input input-bordered w-full"
              placeholder="********"
            />
          </div>
          <button type="submit" class="btn btn-primary w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
