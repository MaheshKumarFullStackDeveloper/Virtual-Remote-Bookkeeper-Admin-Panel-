export interface BookDetails {

  _id: string;
  title: string;
  images: string[];
  subject: string;
  category: string;
  condition: string;
  classType: string;
  price: number;
  author: string;
  edition?: string;
  description?: string;
  finalPrice: number;
  shippingCharge: string;
  seller: UserData;
  paymentMode: 'UPI' | 'Bank Account';
  createdAt: Date;
  paymentDetails: {
    upi?: string;
    bankDetails?: {
      accountNumber: string;
      ifscCode: string;
      bankName: string;

    }

  }
}

export interface Sections {
  _id: string;
  title: string;
  page: string;
  order: string;
  content: string;
  pageId?: string;
}

export interface Page {
  _id: string;
  title: string;
  slug: string;
  status: string;
  metaTitle: string;
  metaDescription: string;
  pageId?: string;
  sections?: Sections[];
}
export interface Widget {
  _id: string;
  widgetId: string;
  title: string;
  content: string;
}
export interface Faq {
  _id: string;
  faqId: string;
  title: string;
  content: string;
  categories?: Category[];
}
export interface Menu {
  _id: string;
  menuId: string;
  title: string;
  items?: Item[];
}
export interface DeleteMenuParams {
  menuId: string;
  type: string;
}
export interface Item {
  _id: string;
  parent?: string;
  itemId: string;
  title: string;
  link: string;
  order?: number;
  menu?: string;
  children?: ChildItem[];
}
export interface ChildItem {
  _id: string;
  itemId: string;
  parent?: string;
  title: string;
  link: string;
  order?: number;
  menu?: string;
}

export interface Blog {
  _id: string;
  blogId: string;
  title: string;
  slug: string;
  image: string;
  status: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  categories?: Category[];
}
export interface Category {
  _id: string;
  categoryId: string;
  title: string;
  slug: string;
  order: number;
  status: string;
  metaTitle: string;
  metaDescription: string;
}



export interface AlertProps {
  variant: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  showLink: boolean;
}
export interface ImageDetails {
  _id: string;
  image: string[];
  user: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface UserData {
  name: string;
  email: string;
  _id: string;
  isVerified: boolean;
  updatedAt: string;
  agreeTerms: boolean;
  profilePicture?: string;
  phoneNumber?: string;
  addresses: Address[]
}


export interface Address {
  _id: string;
  addressLine1: string;
  addressLine2: string;
  phoneNumber?: string;
  city?: string;
  state?: string;
  pincode: string;
}

export interface Product {
  _id: string;
  title: string;
  images: string[];
  price: number;
  finalPrice: number;
  shippingCharge: string;
}

