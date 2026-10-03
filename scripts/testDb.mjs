import { createClient } from "@libsql/client";

const url = "libsql://my-love-yosefmehari.aws-ca-central-1.turso.io";

console.log("Testing connection to:", url);

async function test() {
  try {
    const client = createClient({
      url: url,
    });
    const rs = await client.execute("SELECT 1 as test;");
    console.log("Success! Result:", rs);
  } catch (err) {
    console.error("Error connecting without token:", err.message);
  }
}

test();
