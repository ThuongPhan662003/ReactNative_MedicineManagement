import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform } from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      {...rest}
      href={href}
      onPress={async (event) => {
        if (Platform.OS !== 'web') {
          // Kiểm tra nếu đường dẫn là ngoại bộ (bắt đầu bằng 'http://' hoặc 'https://')
          if (href.startsWith('http://') || href.startsWith('https://')) {
            // Prevent the default behavior of linking to the default browser on native.
            event.preventDefault();
            // Mở đường dẫn ngoài trong trình duyệt của ứng dụng.
            await openBrowserAsync(href);
          } else {
            // Đối với đường dẫn nội bộ, sẽ sử dụng 'Link' của expo-router để điều hướng mà không mở tab mới.
            // Link sẽ tự động điều hướng mà không cần mở thêm tab.
          }
        }
      }}
    />
  );
}
