# FoodTruck Financier コーディング規約

このドキュメントは、`food-truck-financier` プロジェクトにおけるコードの品質と一貫性を保つためのコーディング規約を定めたものです。

## 1. 基本方針

- **フレームワーク**: [Next.js (App Router)](https://nextjs.org/) を採用し、サーバーコンポーネントとクライアントコンポーネントを適切に使い分けます。
- **言語**: [TypeScript](https://www.typescriptlang.org/) を使用し、厳格な型付け（`strict: true`）を強制します。
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/) を全面的に採用し、ユーティリティファーストでスタイリングを行います。UIコンポーネントの基盤として [shadcn/ui](https://ui.shadcn.com/) を利用します。
- **状態管理**:
  - サーバーサイドの状態やリアルタイムデータは [Firebase Realtime Database](https://firebase.google.com/docs/database) と `react-firebase-hooks` を用いて管理します。
  - コンポーネントのローカルな状態は React の `useState` フックを使用します。
- **フォーム**: [React Hook Form](https://react-hook-form.com/) と [Zod](https://zod.dev/) を組み合わせて、フォームの実装とバリデーションを行います。
- **テスト**: [Bun test](https://bun.com/docs/cli/test) を用いて、コンポーネントのユニットテスト・結合テストを記述します。
- **フォーマット**: [Prettier](https://prettier.io/) を使用し、コードフォーマットを自動で統一します。

---

### 2. ディレクトリ構成

`src` ディレクトリ以下は、機能と責務に基づいて以下のように構成します。

```
src
├── app/                  # Next.js App Router (ルーティング、ページ、レイアウト)
│   ├── (auth)/           # 認証関連ページ (ルートグループ)
│   ├── (others)/         # その他一般ページ (ルートグループ)
│   ├── dashboard/        # ダッシュボードページ
│   ├── register/         # レジ関連ページ
│   └── ...
├── components/           # 再利用可能なコンポーネント
│   ├── functional/       # ビジネスロジックを含む機能コンポーネント
│   ├── ui/               # shadcn/ui によって生成された汎用UIコンポーネント
│   ├── ui-element/       # プロジェクト固有のUI要素 (Header, Keypadなど)
│   └── accessError.tsx   # 汎用コンポーネント
├── firebase/             # Firebase の初期化設定
├── hooks/                # カスタムフック
├── lib/                  # ユーティリティ関数、ライブラリ設定
├── public/               # 静的アセット (画像など)
└── types/                # グローバルな型定義
```

---

### 3. 命名規則

| 対象 | 命名規則 | 例 |
| :--- | :--- | :--- |
| **ファイル（コンポーネント）** | `camelCase.tsx` | `commodityCard.tsx` |
| **ファイル（その他）** | `camelCase.ts` | `useError.ts` (vsCodeのquick fixで作成したファイル名そのまま) (react componentを含まない場合は`.ts`を使用すること) |
| **ディレクトリ** | `kebab-case` | `register/menu` |
| **Reactコンポーネント** | `PascalCase` | `CommodityCard` |
| **変数・関数** | `camelCase` | `currentOrder`, `handleOrder` |
| **型・インターフェース** | `PascalCase` | `OrderType`, `StallInfo` |
| **テストファイル** | `[対象ファイル名].test.tsx` | `commodityCard.test.tsx` |

---

### 4. コーディングスタイル

#### 4.1. TypeScript

- **厳格な型付け**: `tsconfig.json` の `"strict": true` を維持し、常に厳格な型チェックを行います。
- **`any` の禁止**: `any` 型の使用は原則として禁止します。やむを得ず使用する場合は理由をコメントで記述してから踏み潰してください。(緊急修正の場合はこの限りではありません)
- **型定義**:
  - プロジェクト全体で共通の型は `src/types/` ディレクトリに定義します。
  - コンポーネント固有の Props 型などは、コンポーネントファイル内に定義します。

#### 4.2. React / Next.js

- **関数コンポーネント**: コンポーネントはすべて関数コンポーネントと Hooks を使用して記述します。
- **`"use client";`**: インタラクティブな処理やフック（`useState`, `useEffect`など）が必要なコンポーネントの先頭には `"use client";` を明記します。必要ないコンポーネントはサーバーコンポーネントとして実装します。
- **コンポーネントの責務分離**:
  - **Pageコンポーネント (`page.tsx`)**: データ取得と、機能コンポーネントへのデータ受け渡しを担当します。
  - **Functionalコンポーネント (`src/components/functional`)**: ビジネスロジックや状態管理を含み、特定の機能を実現します。
  - **UIコンポーネント (`src/components/ui`, `ui-element`)**: 見た目と再利用性に特化し、ロジックを極力含めません。
- **Props**: Props は分割代入で受け取り、型を明確に定義します。

```tsx
// 良い例
export default function CommodityCard({
  commodity,
  count,
  setCount
}: {
  commodity: Partial<CommodityType>;
  count: number;
  setCount(count: number): void;
}) {
  // ...
}
```

#### 4.3. フォーマットとリンティング

- **Prettier**: コミット前に必ず Prettier を実行し、コードフォーマットを統一します。`prettier-plugin-organize-imports` により、import 文の順序も自動で整理されます。
- **ESLint**: `next lint` コマンドで静的解析を行い、エラーや警告がない状態を維持します。

---

### 5. スタイリング (Tailwind CSS)

- **ユーティリティファースト**: 原則として、すべてのスタイリングは Tailwind CSS のユーティリティクラスで行います。
- **`cn` ユーティリティ**: 条件付きのクラスや、クラスのマージには `src/lib/utils.ts` の `cn` 関数を使用します。

```tsx
// 良い例
<div className={cn("p-4", isLoading && "opacity-50")} />
```

- **カスタムCSS**: `globals.css` で定義された CSS 変数に基づいたテーマ設計に従います。新たなカスタムCSSの追加は、Tailwind で表現できない場合に限定し、チームで合意の上で行います。

---

### 6. 状態管理

- **Firebase Hooks**: Firebase Realtime Database とのデータ同期には `react-firebase-hooks` (`useObjectVal`, `useListVals`など）を積極的に利用します。これにより、リアルタイムなUI更新を宣言的に実装できます。
- **`useState`**: フォームの入力値やUIの開閉状態など、コンポーネント内で完結する一時的な状態には `useState` を使用します。
- **データ更新**: Firebase のデータ更新は、`firebase/database` の `set`, `update`, `remove` 関数を使用して行います。

---

### 7. テスト

- **配置場所**: テストファイルは、テスト対象のコンポーネントと同じディレクトリに `*.test.tsx` という名前で配置します。
- **テスト内容**:
  - コンポーネントが正しくレンダリングされるか。
  - Props に応じて表示が変化するか。
  - ユーザーインタラクション（クリックなど）によって期待通りの動作（コールバック関数の呼び出しなど）をするか。
- **ライブラリ**: `Bun test` の作法に従い、ユーザーの視点に近いテストを記述します。`screen` オブジェクトを介した要素の取得を基本とします。

---

### 8. ドキュメンテーション

- **README**: プロジェクトの概要、セットアップ方法、デモ情報などを `docs/README.md` に記載します。
- **機能仕様**: 各機能の使い方や仕様は `docs/help/` ディレクトリ以下に Markdown 形式で記述し、常に最新の状態を保ちます。
- **コードコメント**: 複雑なロジックや、意図が分かりにくいコードには、その理由や目的を説明するコメントを簡潔に記述します。

---

### 9. エラーハンドリング

- **`useError` フック**: `react-firebase-hooks` などから返されるエラーオブジェクトは、カスタムフック `useError` に渡して一元的に処理します。これにより、エラーのコンソール出力とトースト通知が一貫した方法で行われます。