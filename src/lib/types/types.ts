export interface BookDetails {

 _id :string;
 title :string;
 images :string[];
 subject :string;
 category :string;
 condition :string;
 classType :string;
 price:number; 
 author:string;
 edition?:string;
 description?:string;
finalPrice:number;
shippingCharge:string;
seller:UserData;
paymentMode:'UPI'|'Bank Account';
createdAt:Date;
paymentDetails:{
    upi?:string;
    bankDetails?:{
        accountNumber:string;
        ifscCode:string;
        bankName:string;

    }

}
}


export interface UserData  {
 name :string;
 email :string;
 _id:string;
 isVerified: boolean;
 updatedAt:string;
 agreeTerms :boolean;
 profilePicture? :string;
 phoneNumber? :string;
 addresses:Address[]
}


export interface Address  {
_id:string;
 addressLine1 :string;
 addressLine2 :string;
 phoneNumber? :string;
 city? :string;
 state? :string;
 pincode :string;
}

export interface Product {
_id:string;
 title :string;
 images :string[];
 price :number;
 finalPrice :number;
  shippingCharge :string;
}

