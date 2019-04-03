using MateralTools.MConvert;
using RecordBill.Model;
using System;
using System.Reflection;

namespace RecordBill.BLL
{
    /// <summary>
    /// 业务处理类父类
    /// </summary>
    /// <typeparam name="TDAL">对应的数据操作类</typeparam>
    /// <typeparam name="TModel">对应的数据模型</typeparam>
    /// <typeparam name="VModel">对应的视图模型</typeparam>
    public abstract class BaseBLL<TDAL, TModel, VModel> : BaseBLL<TDAL, TModel>
    {
        /// <summary>
        /// 根据唯一标识获得视图信息
        /// </summary>
        /// <param name="id">唯一标识</param>
        /// <returns></returns>
        public virtual VModel GetDBModelViewInfoByID(object id)
        {
            MethodInfo method = (typeof(TDAL)).GetMethod("GetDBModelViewInfoByID");
            if (method != null)
            {
                return (VModel)method.Invoke(_dal, new object[] { id });
            }
            else
            {
                throw new ApplicationException("未实现该方法，需重写");
            }
        }
    }
    /// <summary>
    /// 业务处理类父类
    /// </summary>
    /// <typeparam name="TDAL">对应的数据操作类</typeparam>
    /// <typeparam name="TModel">对应的数据模型</typeparam>
    public abstract class BaseBLL<TDAL, TModel>
    {
        /// <summary>
        /// 数据操作对象
        /// </summary>
        public readonly TDAL _dal;
        /// <summary>
        /// 构造方法
        /// </summary>
        public BaseBLL()
        {
            _dal = _dal.MGetDefultObject<TDAL>();
        }
        /// <summary>
        /// 验证模型
        /// </summary>
        /// <param name="model">要验证的模型</param>
        /// <param name="msg">提示信息</param>
        /// <returns>验证结果</returns>
        protected abstract bool Verification(TModel model, out string msg);
        /// <summary>
        /// 验证添加模型
        /// </summary>
        /// <param name="model">要验证的模型</param>
        /// <param name="msg">提示信息</param>
        /// <returns>验证结果</returns>
        protected virtual bool VerificationAdd(TModel model, out string msg)
        {
            return Verification(model, out msg);
        }
        /// <summary>
        /// 验证修改模型
        /// </summary>
        /// <param name="model">要验证的模型</param>
        /// <param name="msg">提示信息</param>
        /// <returns>验证结果</returns>
        protected virtual bool VerificationUpdate(TModel model, out string msg)
        {
            return Verification(model, out msg);
        }
        /// <summary>
        /// 根据唯一标识获得信息
        /// </summary>
        /// <param name="id">唯一标识</param>
        /// <returns></returns>
        public virtual TModel GetDBModelInfoByID(object id)
        {
            MethodInfo method = (typeof(TDAL)).GetMethod("GetDBModelInfoByID");
            if (method != null)
            {
                return (TModel)method.Invoke(_dal, new object[] { id });
            }
            else
            {
                throw new ApplicationException("未实现该方法，需重写");
            }
        }
        /// <summary>
        /// 添加一个对象
        /// </summary>
        /// <param name="model">要添加的对象</param>
        /// <param name="idName">主键名称</param>
        public virtual TModel Add(TModel model, string idName = "ID")
        {
            MethodInfo method = (typeof(TDAL)).GetMethod("Insert");
            if (method != null)
            {
                if (VerificationAdd(model,out string msg))
                {
                    model = (TModel)method.Invoke(_dal, new object[] { model });
                    ApplicationLogBLL.WriteOptionsLog("新增对象：成功",
                        $"操作类型：{typeof(TModel)}\r\n" +
                        $"唯一标识：{GetID(model, idName)}\r\n" +
                        $"操作时间：{DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")}\r\n"
                        );
                    return model;
                }
                else
                {
                    throw new RecordBillException(msg);
                }
            }
            else
            {
                throw new ApplicationException("未实现该方法，需重写");
            }
        }
        /// <summary>
        /// 删除一个对象
        /// </summary>
        /// <param name="id">对象ID</param>
        public virtual void Delete(object id)
        {
            Type TType = typeof(TModel);
            PropertyInfo pi = TType.GetProperty("IsDelete");
            if (pi == null)
            {
                MethodInfo method = (typeof(TDAL)).GetMethod("Delete");
                if (method != null)
                {
                    method.Invoke(_dal, new object[] { id });
                    ApplicationLogBLL.WriteOptionsLog("删除对象：成功",
                        $"操作类型：{typeof(TModel)}\r\n" +
                        $"唯一标识：{id.ToString()}\r\n" +
                        $"操作时间：{DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")}\r\n"
                        );
                }
                else
                {
                    throw new ApplicationException("未实现该方法，需重写");
                }
            }
            else
            {
                TModel DBModel = GetDBModelInfoByID(id);
                pi.SetValue(DBModel, true);
                MethodInfo method = (typeof(TDAL)).GetMethod("SaveChange");
                if (method != null)
                {
                    method.Invoke(_dal, new object[] { });
                    ApplicationLogBLL.WriteOptionsLog("设置删除标识：成功",
                        $"操作类型：{typeof(TModel)}\r\n" +
                        $"唯一标识：{id.ToString()}\r\n" +
                        $"操作时间：{DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")}\r\n"
                        );
                }
                else
                {
                    throw new ApplicationException("未实现保存方法，需重写");
                }
            }
        }
        /// <summary>
        /// 修改一个对象
        /// </summary>
        /// <param name="model">要修改的对象</param>
        /// <param name="idName">主键名称</param>
        public virtual TModel Update(TModel model, string idName = "ID")
        {
            Type TType = model.GetType();
            PropertyInfo[] pis = TType.GetProperties();
            PropertyInfo pi = TType.GetProperty(idName);
            TModel DBModel = GetDBModelInfoByID(pi.GetValue(model));
            if (DBModel != null)
            {
                foreach (PropertyInfo item in pis)
                {
                    if (item.Name != "IsDelete")
                    {
                        item.SetValue(DBModel, item.GetValue(model));
                    }
                }
                if (VerificationUpdate(DBModel, out string msg))
                {
                    MethodInfo method = (typeof(TDAL)).GetMethod("SaveChange");
                    if (method != null)
                    {
                        method.Invoke(_dal, new object[] { });
                        ApplicationLogBLL.WriteOptionsLog("修改对象：成功",
                            $"操作类型：{typeof(TModel)}\r\n" +
                            $"唯一标识：{GetID(model, idName)}\r\n" +
                            $"操作时间：{DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")}\r\n"
                            );
                        return DBModel;
                    }
                    else
                    {
                        throw new ApplicationException("未实现保存方法，需重写");
                    }
                }
                else
                {
                    throw new RecordBillException(msg);
                }
            }
            else
            {
                throw new ApplicationException("修改失败，该对象不存在于数据库中");
            }
        }
        /// <summary>
        /// 获得主键值
        /// </summary>
        /// <param name="model">操作类型</param>
        /// <param name="idName">主键名称</param>
        /// <returns></returns>
        public string GetID(TModel model, string idName="ID")
        {
            Type TType = model.GetType();
            PropertyInfo pi = TType.GetProperty(idName);
            return pi.GetValue(model).ToString();
        }
    }
}
