const { ThongBao } = require("../models");

class TenantController {
  async listNotifications(req, res, next) {
    try {
      const data = await ThongBao.findAll({
        where: { ma_tai_khoan_nhan: req.user.ma_tai_khoan },
        order: [["thoi_diem_gui", "DESC"]],
      });
      res.json({ success: true, data, message: "Lấy thông báo thành công" });
    } catch (error) {
      next(error);
    }
  }

  async createIssue(req, res, next) {
    try {
      if (!req.body.noi_dung)
        return res
          .status(400)
          .json({ success: false, message: "Vui lòng nhập nội dung sự cố" });
      const data = await ThongBao.create({
        ma_tai_khoan_nhan: req.user.ma_tai_khoan,
        doi_tuong_lien_quan: "SU_CO",
        loai_thong_bao: "SU_CO",
        noi_dung: req.body.noi_dung,
      });
      res
        .status(201)
        .json({ success: true, data, message: "Đã gửi thông báo sự cố" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TenantController();
