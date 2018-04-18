namespace RecordBill.APP.Bill {
    /**
     * 账单查询模型
     */
    export class QueryBillModel {
        /**
         * 用户ID
         */
        public userID: string;
        /**
         * 最小日期
         */
        public minDate: Date;
        /**
         * 最大日期
         */
        public maxDate: Date;
    }
}