import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string;
      image: string | null;
      role: string;
      emailVerified: Date | null;// Campo personalizado
    } 
  }

  interface User {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    role: string;
    emailVerified: Date | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    role: string; // Campo personalizado
  }
}

//For the adaptor user objcet
//Here add any other fields you have in user table that are not part of the default schema.
declare module "@auth/core/adapters" {
  interface AdapterUser extends User {
    role: string;
  }
}