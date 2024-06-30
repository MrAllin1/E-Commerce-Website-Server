interface sendEmailRequest {
    produkti: number;
    sasia: number;
    emri: string;
    mbiemri: string;
    adresa: string;
    numri: string;
    qyteti: string;
    phoneNumber: string;
    email: string;
    font?: string;
    text?: string;
}

interface sendEmailResponse {
    success?: boolean;
}

export { sendEmailRequest, sendEmailResponse };

