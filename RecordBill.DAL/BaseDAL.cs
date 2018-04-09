using MateralTools.MConvert;
using RecordBill.Model;
using System;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace RecordBill.DAL
{
    public class BaseDAL<TModel, VModel> : BaseDAL<TModel> where TModel : class where VModel : class
    {
        public BaseDAL(string idName = "ID") : base(idName)
        {
        }

        /// <summary>
        /// 根据主键获得数据模型对象信息
        /// </summary>
        /// <param name="id">主键值</param>
        /// <returns>模型对象信息</returns>
        public VModel GetDBModelViewInfoByID(object id)
        {
            DbSet<VModel> dbSet = GetDBViewSet();
            PropertyInfo modelPro = typeof(VModel).GetProperty(_idName);
            if (modelPro != null)
            {
                Expression<Func<VModel, bool>> expression;
                Type proType = modelPro.PropertyType;
                if (proType.GUID == typeof(Int32).GUID)
                {
                    int ID = Convert.ToInt32(id);
                    expression = m => (int)modelPro.GetValue(m) == ID;
                }
                else if (proType.GUID == typeof(Int64).GUID)
                {
                    long ID = Convert.ToInt64(id);
                    expression = m => (long)modelPro.GetValue(m) == ID;
                }
                else if (proType.GUID == typeof(Guid).GUID)
                {
                    Guid ID = (Guid)id;
                    expression = m => (Guid)modelPro.GetValue(m) == ID;
                }
                else
                {
                    throw new ArgumentException($"该方法不支持类型{typeof(VModel).Name}");
                }
                return dbSet.Where(expression.Compile()).FirstOrDefault();
            }
            else
            {
                throw new ArgumentException($"类型{typeof(VModel).Name}不包含属性{_idName}");
            }
        }
        /// <summary>
        /// 获得数据模型属性信息
        /// </summary>
        /// <param name="modelTypeName">模型类型名称</param>
        /// <returns></returns>
        private DbSet<VModel> GetDBViewSet()
        {
            PropertyInfo dbPro = _DB.GetType().GetProperty(typeof(VModel).Name);
            if (dbPro != null)
            {
                DbSet<VModel> dbSet = dbPro.GetValue(_DB) as DbSet<VModel>;
                return dbSet;
            }
            else
            {
                throw new ArgumentException($"类型{typeof(VModel).Name}错误。");
            }
        }
    }
    /// <summary>
    /// 数据操作类父类
    /// </summary>
    /// <typeparam name="T">要操作的主要类型</typeparam>
    public class BaseDAL<T> : BaseDAL where T : class
    {
        public BaseDAL(string idName = "ID") : base(idName)
        {
        }

        /// <summary>
        /// 添加之前
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        protected virtual T BeforeInsert(T model)
        {
            return GetBeforeInsertModel(model, _idName);
        }
        /// <summary>
        /// 根据主键获得数据模型对象信息
        /// </summary>
        /// <param name="id">主键值</param>
        /// <returns>模型对象信息</returns>
        public virtual T GetDBModelInfoByID(object id)
        {
            DbSet<T> dbSet = GetDBSet();
            PropertyInfo modelPro = typeof(T).GetProperty(_idName);
            if (modelPro != null)
            {
                Expression<Func<T, bool>> expression;
                Type proType = modelPro.PropertyType;
                if (proType.GUID == typeof(Int32).GUID)
                {
                    int ID = Convert.ToInt32(id);
                    expression = m => (int)modelPro.GetValue(m) == ID;
                }
                else if (proType.GUID == typeof(Int64).GUID)
                {
                    long ID = Convert.ToInt64(id);
                    expression = m => (long)modelPro.GetValue(m) == ID;
                }
                else if (proType.GUID == typeof(Guid).GUID)
                {
                    Guid ID = (Guid)id;
                    expression = m => (Guid)modelPro.GetValue(m) == ID;
                }
                else
                {
                    throw new ArgumentException($"该方法不支持类型{typeof(T).Name}");
                }
                return dbSet.Where(expression.Compile()).FirstOrDefault();
            }
            else
            {
                throw new ArgumentException($"类型{typeof(T).Name}不包含属性{_idName}");
            }
        }
        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="model">要添加的对象</param>
        public virtual T Insert(T model)
        {
            model = BeforeInsert(model);
            DbSet<T> dbSet = GetDBSet();
            dbSet.Add(model);
            _DB.SaveChanges();
            return model;
        }
        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="id">要删除的模型主键或者模型对象</param>
        public virtual void Delete(object id)
        {
            T model;
            if (id.GetType().GUID == typeof(T).GUID)
            {
                model = (T)id;
            }
            else
            {
                model = GetDBModelInfoByID(id);
                if (model == default(T))
                {
                    throw new ArgumentException($"参数{nameof(id)}错误。");
                }
            }
            DbSet<T> dbSet = GetDBSet();
            dbSet.Remove(model);
            _DB.SaveChanges();
        }
        /// <summary>
        /// 获得数据模型属性信息
        /// </summary>
        /// <param name="modelTypeName">模型类型名称</param>
        /// <returns></returns>
        private DbSet<T> GetDBSet()
        {
            PropertyInfo dbPro = _DB.GetType().GetProperty(typeof(T).Name);
            if (dbPro != null)
            {
                DbSet<T> dbSet = dbPro.GetValue(_DB) as DbSet<T>;
                return dbSet;
            }
            else
            {
                throw new ArgumentException($"类型{typeof(T).Name}错误。");
            }
        }
    }
    /// <summary>
    /// 数据操作类父类
    /// </summary>
    public class BaseDAL
    {
        /// <summary>
        /// 数据连接对象
        /// </summary>
        protected readonly RecordBillDBEntities _DB = new RecordBillDBEntities();
        /// <summary>
        /// 主键名称
        /// </summary>
        protected string _idName;
        /// <summary>
        /// 构造方法
        /// </summary>
        /// <param name="idName">主键名称</param>
        public BaseDAL(string idName = "ID")
        {
            _idName = idName;
        }
        /// <summary>
        /// 保存更改
        /// </summary>
        public void SaveChange()
        {
            _DB.SaveChanges();
        }
        /// <summary>
        /// 添加之前
        /// </summary>
        /// <param name="model"></param>
        /// <param name="idName">主键名称</param>
        /// <returns></returns>
        public static T GetBeforeInsertModel<T>(T model, string idName = "ID")
        {
            Type tType = typeof(T);
            ConstructorInfo ci = tType.GetConstructor(new Type[0]);
            if (ci != null)
            {
                T addModel = (T)ci.Invoke(new object[0]);
                model.MCopyProperties(addModel);
                PropertyInfo pi = tType.GetProperty(idName);
                if (pi != null)
                {
                    Guid piGuid = pi.PropertyType.GUID;
                    if (piGuid == typeof(Guid).GUID)
                    {
                        if (((Guid)pi.GetValue(addModel)) == Guid.Empty)
                        {
                            pi.SetValue(addModel, Guid.NewGuid());
                        }
                    }
                }
                return addModel;
            }
            else
            {
                throw new ArgumentException($"类型{typeof(T).Name}不支持该方法。");
            }
        }
    }
}
