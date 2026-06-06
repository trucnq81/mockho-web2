import { useState } from "react";
import { supabase } from "./supabaseClient.js";

export default function App() {
  const [bookingSent, setBookingSent] = useState(false);

  async function handleBooking(e) {
    e.preventDefault();

    const form = e.currentTarget;

    const booking = {
      customer_name: form.name.value,
      phone: form.phone.value,
      service: form.service.value,
      booking_date: form.date.value || null,
      guests: Number(form.guests.value) || null,
      note: form.note.value,
      status: "new",
      source: "website",
    };

    const { error } = await supabase.from("bookings").insert([booking]);

    if (error) {
      alert("Lỗi gửi booking: " + error.message);
      return;
    }

    setBookingSent(true);
    form.reset();
  }

  return (
    <main>
      <section>
        <div>
          <p>Mộc K’Ho Restaurant • Hotel • Homestay</p>
          <h1>Không gian ẩm thực & nghỉ dưỡng giữa núi rừng Đà Lạt</h1>
          <p>
            Nhà hàng – khách sạn – homestay dành cho khách đoàn, gia đình và du
            lịch nghỉ dưỡng tại Lang Biang.
          </p>
          <a href="#booking">Đặt bàn ngay</a>
          <a href="https://zalo.me/0937376169">Chat Zalo</a>
        </div>
      </section>

      <section>
        <div>
          <h2>Mộc K’Ho – trải nghiệm đậm chất Đà Lạt & Tây Nguyên</h2>
          <p>
            Mộc K’Ho là tổ hợp nhà hàng, khách sạn và homestay giữa thiên nhiên
            Lang Biang – Đà Lạt.
          </p>
        </div>
      </section>

      <section>
        <div>
          <h2>Một điểm đến – nhiều trải nghiệm</h2>
          <h3>🍲 Nhà hàng</h3>
          <p>Cơm đoàn, đặc sản Tây Nguyên, BBQ, gala dinner.</p>

          <h3>🏨 Khách sạn</h3>
          <p>Phòng nghỉ tiện nghi cho gia đình, cặp đôi và khách tour.</p>

          <h3>🏡 Homestay</h3>
          <p>Không gian nghỉ dưỡng gần thiên nhiên và trải nghiệm Đà Lạt.</p>
        </div>
      </section>

      <section id="booking">
        <div>
          <h2>Đặt bàn & đặt phòng</h2>
          <p>Khách có thể gửi booking trực tiếp từ website.</p>

          <form onSubmit={handleBooking}>
            <input name="name" type="text" placeholder="Họ và tên" required />
            <input name="phone" type="text" placeholder="Số điện thoại" required />

            <select name="service" required>
              <option>Đặt bàn nhà hàng</option>
              <option>Đặt phòng khách sạn</option>
              <option>Đặt homestay</option>
              <option>Khách đoàn / tour</option>
            </select>

            <input name="date" type="date" />
            <input name="guests" type="number" placeholder="Số khách" />
            <textarea name="note" placeholder="Yêu cầu thêm..." />

            <button type="submit">Gửi booking</button>

            {bookingSent && <p>Booking đã được gửi thành công.</p>}
          </form>
        </div>
      </section>

      <section>
        <div>
          <h2>Liên hệ Mộc K’Ho</h2>
          <p>📍 Lang Biang, Đà Lạt, Lâm Đồng</p>
          <p>📞 0937 376 169</p>
          <p>💬 Zalo: 0937 376 169</p>
        </div>
      </section>
    </main>
  );
}
