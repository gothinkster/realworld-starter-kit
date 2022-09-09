import { component$ } from '@builder.io/qwik';

export const Logo = component$(() => {
  return (
    <div style={{ 'text-align': 'center' }}>
      <a href="https://qwik.builder.io/">
        <img
          alt="Qwik Logo"
          width={400}
          height={147}
          src="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F667ab6c2283d4c4d878fb9083aacc10f"
        />
      </a>
    </div>
  );
});
