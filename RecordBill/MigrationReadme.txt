/*添加迁移*/
Add-migration -context RecordBillDbContext xxxxxxxxxx

/*更新迁移*/
update-database -context RecordBillDbContext


/*移除迁移*/
remove-migration -context RecordBillDbContext