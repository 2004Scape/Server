export type WealthEventItem = {
    id: number | undefined;
    name: string | null;
    count: number;
}

export type WealthEventParams = {
    event_type: number;

    account_items: WealthEventItem[];
    account_value: number;

    recipient_id?: number;
    recipient_session?: string;
    recipient_items?: WealthEventItem[];
    recipient_value?: number;
};

export type WealthEvent = WealthEventParams & {
    coord: number;
    account_id: number;
    account_session: string;
};

export type WealthTransactionEvent =  WealthEvent & { 
    timestamp: number; 
};