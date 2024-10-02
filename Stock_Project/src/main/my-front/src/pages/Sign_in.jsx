import React, { useState } from 'react';
import { auth, db, firebase } from "../lib/firebase"; // Firebase 설정을 가져온다.
import { useNavigate, useLocation } from 'react-router-dom';


export default function Sign() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    agree: false
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.email) {
      newErrors.email = '이메일을 입력하세요.';
    }

    if (!form.password || form.password.length < 8) {
      newErrors.password = '8자 이상의 비밀번호를 입력하세요.';
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    if (!form.name) {
      newErrors.name = '이름을 입력하세요.';
    }

    if (!form.phone) {
      newErrors.phone = '휴대폰 번호를 입력하세요.';
    }

    if (!form.agree) {
      newErrors.agree = '약관에 동의해야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      try {
        // Firebase Authentication에 사용자 등록
        const userCredential = await auth.createUserWithEmailAndPassword(form.email, form.password);
        const user = userCredential.user;
  
        // Firestore에 사용자 정보 저장
        await db.collection('users').doc(user.uid).set({
          uid: user.uid,
          name: form.name,
          email: form.email,
          phone: form.phone,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
  
        setSuccessMessage('회원가입에 성공했습니다.');
        console.log('회원가입에 성공했습니다:', form);
        alert('회원가입에 성공했습니다');
        navigate('/', { state: pathname });
      } catch (error) {
        console.error('회원가입 중 오류 발생:', error);
        setErrors({ form: error.message });
      }
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>회원정보를 입력해주세요</h2>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errors.form && <p style={{ color: 'red' }}>{errors.form}</p>}

      <div>
        <label>아이디(이메일)</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="이메일을 입력하세요"
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>

      <div>
        <label>비밀번호</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="비밀번호 입력 (8-20자)"
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>

      <div>
        <label>비밀번호 확인</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="비밀번호를 다시 입력하세요"
        />
        {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
      </div>

      <div>
        <label>이름</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="이름을 입력하세요"
        />
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
      </div>

      <div>
        <label>휴대폰 번호</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="휴대폰 번호를 입력하세요"
        />
        {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
          />
          모두 확인하였으며 동의합니다.
        </label>
        {errors.agree && <p style={{ color: 'red' }}>{errors.agree}</p>}
      </div>

      <button type="submit">회원가입</button>
    </form>
  );
}
