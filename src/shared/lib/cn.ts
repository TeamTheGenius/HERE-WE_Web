import { clsx, ClassValue } from 'clsx';

/**
 * 주어진 클래스 이름을 조건에 맞게 조합하여 반환합니다.
 *
 * @param {...ClassValue[]} classnames - `clsx`에 전달할 클래스 값들
 * @returns {string} 조합된 클래스 문자열
 *
 * @example
 * ```ts
 * cn("btn", { "btn-primary": isPrimary, "btn-disabled": isDisabled });
 * // "btn btn-primary" (isPrimary가 true일 경우)
 * ```
 */
export function cn(...classnames: ClassValue[]): string {
  return clsx(...classnames);
}
