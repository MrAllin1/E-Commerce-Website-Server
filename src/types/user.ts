interface User {
    UserID?: number; // UserID may not be present in the request body since it's auto-generated
    Username: string;
    Email: string;
    Password: string;
    Role?: 'Administrator' | 'Shopper'; // Role may not be present in the request body since it's optional
  }
  
  export { User };
  