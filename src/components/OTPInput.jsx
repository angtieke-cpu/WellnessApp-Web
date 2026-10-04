import { useRef } from 'react';

export default function OTPInput({ length = 6, value, onChange }) {
  const inputs = useRef([]);

  const handleChange = (val, index) => {
    if (!/^\d?$/.test(val)) return;

    const newOtp = [...value];
    newOtp[index] = val;
    onChange(newOtp.join(''));

    if (val && index < length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').trim();

    if (!/^\d+$/.test(paste)) return;

    const digits = paste.slice(0, length).split('');

    const newOtp = [...value];

    digits.forEach((digit, i) => {
      newOtp[i] = digit;
    });

    onChange(newOtp.join(''));
  };

  return (
    <div style={styles.container} onPaste={handlePaste}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength="1"
          value={value[index] || ''}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          style={styles.input}
        />
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    margin: '30px 0',
  },

  input: {
    width: '50px',
    height: '55px',
    textAlign: 'center',
    fontSize: '20px',
    borderRadius: '12px',
    border: '1px solid #ddd',
    outline: 'none',
  },
};
